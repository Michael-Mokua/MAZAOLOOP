import { getGroqClient } from '@/lib/groq';
import { MATCHING_CONFIG, WASTE_TYPES, USE_CASES } from '@/lib/constants';
import { MatchCandidate, LLMMatchResult } from '@/lib/types';
import { FilteredCandidate } from './rules-engine';
import { formatWeight, formatDistance } from '@/lib/utils';

/**
 * Phase 2: LLM-powered ranking of shortlisted candidates.
 * 
 * Takes the pre-filtered candidates from the rules engine and uses
 * Groq's Llama 3.3 70B to reason over them and produce scored,
 * explained rankings.
 */

interface RankingContext {
  /** The source item (listing or demand) being matched against */
  source: {
    type: 'listing' | 'demand';
    waste_type: string;
    quantity_kg: number;
    condition?: string;
    location_name: string;
    use_case?: string;
    needed_by?: string | null;
    available_from?: string;
  };
  /** Pre-filtered candidates to rank */
  candidates: FilteredCandidate[];
}

/**
 * Rank candidates using the Groq LLM.
 * Returns scored and reasoned match results.
 */
export async function rankCandidatesWithLLM(
  context: RankingContext
): Promise<LLMMatchResult[]> {
  const groq = getGroqClient();

  // Build the prompt
  const wasteLabel = WASTE_TYPES[context.source.waste_type as keyof typeof WASTE_TYPES]?.label || context.source.waste_type;
  
  const sourceDescription = context.source.type === 'listing'
    ? `A farmer is offering ${formatWeight(context.source.quantity_kg)} of ${wasteLabel} (${context.source.condition || 'mixed'} condition) from ${context.source.location_name}, available from ${context.source.available_from || 'now'}.`
    : `A buyer needs ${formatWeight(context.source.quantity_kg)} of ${wasteLabel} in ${context.source.location_name} for ${USE_CASES[context.source.use_case as keyof typeof USE_CASES]?.label || context.source.use_case}${context.source.needed_by ? `, needed by ${context.source.needed_by}` : ''}.`;

  const candidatesList = context.candidates.map((c, i) => {
    const cand = c.candidate;
    if (context.source.type === 'listing') {
      // Candidates are demands
      return `${i + 1}. ID: ${cand.id} | Buyer needs ${formatWeight(cand.quantity_kg_min || cand.quantity_kg)}–${formatWeight(cand.quantity_kg_max || cand.quantity_kg)} | Use: ${USE_CASES[cand.use_case as keyof typeof USE_CASES]?.label || cand.use_case} | Prefers: ${cand.preferred_condition || 'any'} condition | Location: ${cand.location_name} (${formatDistance(c.distance_km)} away)${cand.needed_by ? ` | Needed by: ${cand.needed_by}` : ''}`;
    } else {
      // Candidates are listings
      return `${i + 1}. ID: ${cand.id} | Farmer offers ${formatWeight(cand.quantity_kg)} | Condition: ${cand.condition} | Location: ${cand.location_name} (${formatDistance(c.distance_km)} away) | Available from: ${cand.available_from || 'now'}${cand.available_until ? ` to ${cand.available_until}` : ''}`;
    }
  }).join('\n');

  const systemPrompt = `You are MazaoLoop's AI matching engine for a Kenyan crop waste marketplace. Your job is to rank supply-demand matches by overall fit.

Consider these factors when scoring (0–100):
- Distance/logistics feasibility: Closer is better. Under 10km is excellent, 10-30km is good, 30-50km is acceptable.
- Quantity alignment: A listing that fully meets demand quantity scores higher than partial fills.
- Condition suitability: Match the waste condition to the buyer's use case. Dried waste is better for briquettes, fresh is fine for biogas/compost.
- Timing: Sooner availability for urgent demands scores higher.

Return ONLY a valid JSON array of objects with these exact fields:
[{"id": "candidate-uuid", "score": 85, "reasoning": "One concise sentence explaining why this is a good/poor match"}]

Score 90-100: Excellent match (close, full qty fill, perfect condition)
Score 70-89: Good match (reasonable distance, decent qty overlap)
Score 50-69: Acceptable match (some compromises needed)
Score below 50: Poor match (significant issues)`;

  const userPrompt = `${sourceDescription}

Rank these ${context.candidates.length} potential ${context.source.type === 'listing' ? 'buyers' : 'suppliers'}:

${candidatesList}

Return the JSON array ranking all candidates from best to worst match.`;

  try {
    const completion = await groq.chat.completions.create({
      model: MATCHING_CONFIG.GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 2048,
      response_format: { type: 'json_object' },
    });

    const responseText = completion.choices[0]?.message?.content || '[]';
    
    // Parse the LLM response
    let parsed: any;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      console.error('Failed to parse LLM response:', responseText);
      return fallbackScoring(context.candidates);
    }

    // Extract the array (might be nested under a key)
    const results: LLMMatchResult[] = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed.matches)
      ? parsed.matches
      : Array.isArray(parsed.rankings)
      ? parsed.rankings
      : [];

    // Validate and sanitize
    return results
      .filter((r: any) => r.id && typeof r.score === 'number' && r.reasoning)
      .map((r: any) => ({
        id: r.id,
        score: Math.max(0, Math.min(100, Math.round(r.score))),
        reasoning: String(r.reasoning).slice(0, 500),
      }))
      .sort((a, b) => b.score - a.score);

  } catch (error) {
    console.error('LLM ranking failed:', error);
    // Fallback to distance-based scoring
    return fallbackScoring(context.candidates);
  }
}

/**
 * Fallback scoring when LLM is unavailable.
 * Uses distance-based heuristic scoring.
 */
function fallbackScoring(candidates: FilteredCandidate[]): LLMMatchResult[] {
  return candidates.map((c) => {
    // Simple heuristic: closer = better score
    const distanceScore = Math.max(0, 100 - (c.distance_km * 2));
    const score = Math.round(Math.min(95, Math.max(40, distanceScore)));
    
    return {
      id: c.candidate.id,
      score,
      reasoning: `Distance-based match: ${formatDistance(c.distance_km)} away. LLM ranking temporarily unavailable — using proximity scoring.`,
    };
  }).sort((a, b) => b.score - a.score);
}
