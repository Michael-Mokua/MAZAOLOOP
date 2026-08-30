import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { filterDemandsForListing, filterListingsForDemand } from '@/lib/matching/rules-engine';
import { rankCandidatesWithLLM } from '@/lib/matching/llm-ranker';
import type { MatchingRequest, MatchingResponse } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: MatchingRequest = await request.json();
    
    if (!body.type || !body.id) {
      return NextResponse.json(
        { error: 'Missing required fields: type and id' },
        { status: 400 }
      );
    }

    let matchResults: MatchingResponse;

    if (body.type === 'listing') {
      // Find matching demands for a listing
      const { data: listing, error: listingError } = await supabase
        .from('waste_listings')
        .select('*')
        .eq('id', body.id)
        .single();

      if (listingError || !listing) {
        return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
      }

      // Fetch all active demands
      const { data: demands, error: demandsError } = await supabase
        .from('buyer_demands')
        .select('*')
        .eq('status', 'active');

      if (demandsError) {
        return NextResponse.json({ error: 'Failed to fetch demands' }, { status: 500 });
      }

      const totalCandidates = demands?.length || 0;

      // Phase 1: Rules-based filtering
      const shortlist = filterDemandsForListing(listing, demands || []);

      if (shortlist.length === 0) {
        return NextResponse.json({
          matches: [],
          total_candidates: totalCandidates,
          shortlisted: 0,
        });
      }

      // Phase 2: LLM ranking
      const llmResults = await rankCandidatesWithLLM({
        source: {
          type: 'listing',
          waste_type: listing.waste_type,
          quantity_kg: listing.quantity_kg,
          condition: listing.condition,
          location_name: listing.location_name,
          available_from: listing.available_from,
        },
        candidates: shortlist,
      });

      // Store matches in the database
      for (const result of llmResults) {
        const candidate = shortlist.find(c => c.candidate.id === result.id);
        if (!candidate) continue;

        await supabase.from('matches').upsert({
          listing_id: body.id,
          demand_id: result.id,
          match_score: result.score,
          match_reasoning: result.reasoning,
          distance_km: candidate.distance_km,
          status: 'pending',
        }, {
          onConflict: 'listing_id,demand_id',
        });
      }

      matchResults = {
        matches: llmResults,
        total_candidates: totalCandidates,
        shortlisted: shortlist.length,
      };

    } else if (body.type === 'demand') {
      // Find matching listings for a demand
      const { data: demand, error: demandError } = await supabase
        .from('buyer_demands')
        .select('*')
        .eq('id', body.id)
        .single();

      if (demandError || !demand) {
        return NextResponse.json({ error: 'Demand not found' }, { status: 404 });
      }

      // Fetch all active listings
      const { data: listings, error: listingsError } = await supabase
        .from('waste_listings')
        .select('*')
        .eq('status', 'active');

      if (listingsError) {
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
      }

      const totalCandidates = listings?.length || 0;

      // Phase 1: Rules-based filtering
      const shortlist = filterListingsForDemand(demand, listings || []);

      if (shortlist.length === 0) {
        return NextResponse.json({
          matches: [],
          total_candidates: totalCandidates,
          shortlisted: 0,
        });
      }

      // Phase 2: LLM ranking
      const llmResults = await rankCandidatesWithLLM({
        source: {
          type: 'demand',
          waste_type: demand.waste_type,
          quantity_kg: demand.quantity_kg_min,
          location_name: demand.location_name,
          use_case: demand.use_case,
          needed_by: demand.needed_by,
        },
        candidates: shortlist,
      });

      // Store matches
      for (const result of llmResults) {
        const candidate = shortlist.find(c => c.candidate.id === result.id);
        if (!candidate) continue;

        await supabase.from('matches').upsert({
          listing_id: result.id,
          demand_id: body.id,
          match_score: result.score,
          match_reasoning: result.reasoning,
          distance_km: candidate.distance_km,
          status: 'pending',
        }, {
          onConflict: 'listing_id,demand_id',
        });
      }

      matchResults = {
        matches: llmResults,
        total_candidates: totalCandidates,
        shortlisted: shortlist.length,
      };

    } else {
      return NextResponse.json(
        { error: 'Invalid type. Must be "listing" or "demand".' },
        { status: 400 }
      );
    }

    return NextResponse.json(matchResults);

  } catch (error) {
    console.error('Matching API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
