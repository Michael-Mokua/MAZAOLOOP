import { WasteListing, BuyerDemand, MatchCandidate } from '@/lib/types';
import { haversineDistance } from '@/lib/utils';
import { MATCHING_CONFIG } from '@/lib/constants';

/**
 * Phase 1: Rules-based filtering engine.
 * 
 * Given a listing, find matching demands (or vice versa) using deterministic
 * rules before sending the shortlist to the LLM for ranking.
 * 
 * Rules applied:
 * 1. Waste type — exact match required
 * 2. Distance — within max_distance_km (buyer's or default 50km)
 * 3. Quantity overlap — listing qty >= 10% of demand's minimum
 * 4. Availability — listing dates overlap with demand's needed_by
 * 5. Status — only active items
 */

export interface FilteredCandidate {
  candidate: MatchCandidate;
  distance_km: number;
  demand_id?: string;
  listing_id?: string;
}

/**
 * Find matching demands for a given listing.
 */
export function filterDemandsForListing(
  listing: WasteListing,
  demands: BuyerDemand[]
): FilteredCandidate[] {
  const candidates: FilteredCandidate[] = [];

  for (const demand of demands) {
    // Rule 1: Waste type must match
    if (demand.waste_type !== listing.waste_type) continue;

    // Rule 2: Status must be active
    if (demand.status !== 'active') continue;

    // Rule 3: Distance check
    const distance = haversineDistance(
      listing.latitude, listing.longitude,
      demand.latitude, demand.longitude
    );
    const maxDistance = demand.max_distance_km || MATCHING_CONFIG.DEFAULT_MAX_DISTANCE_KM;
    if (distance > maxDistance) continue;

    // Rule 4: Quantity overlap — listing qty >= 10% of demand's minimum
    const minRequired = demand.quantity_kg_min * MATCHING_CONFIG.MIN_QUANTITY_OVERLAP;
    if (listing.quantity_kg < minRequired) continue;

    // Rule 5: Availability window check
    if (demand.needed_by) {
      const neededBy = new Date(demand.needed_by);
      const availableFrom = new Date(listing.available_from);
      if (availableFrom > neededBy) continue;
    }

    candidates.push({
      candidate: {
        id: demand.id,
        waste_type: demand.waste_type,
        quantity_kg: demand.quantity_kg_min,
        condition: (demand.preferred_condition === 'any' ? 'mixed' : demand.preferred_condition) as any,
        location_name: demand.location_name,
        distance_km: Math.round(distance * 10) / 10,
        needed_by: demand.needed_by,
        use_case: demand.use_case,
        preferred_condition: demand.preferred_condition,
        quantity_kg_min: demand.quantity_kg_min,
        quantity_kg_max: demand.quantity_kg_max,
      },
      distance_km: Math.round(distance * 10) / 10,
      demand_id: demand.id,
    });
  }

  // Sort by distance and limit to shortlist size
  return candidates
    .sort((a, b) => a.distance_km - b.distance_km)
    .slice(0, MATCHING_CONFIG.MAX_SHORTLIST_SIZE);
}

/**
 * Find matching listings for a given demand.
 */
export function filterListingsForDemand(
  demand: BuyerDemand,
  listings: WasteListing[]
): FilteredCandidate[] {
  const candidates: FilteredCandidate[] = [];

  for (const listing of listings) {
    // Rule 1: Waste type must match
    if (listing.waste_type !== demand.waste_type) continue;

    // Rule 2: Status must be active
    if (listing.status !== 'active') continue;

    // Rule 3: Distance check
    const distance = haversineDistance(
      demand.latitude, demand.longitude,
      listing.latitude, listing.longitude
    );
    const maxDistance = demand.max_distance_km || MATCHING_CONFIG.DEFAULT_MAX_DISTANCE_KM;
    if (distance > maxDistance) continue;

    // Rule 4: Quantity overlap
    const minRequired = demand.quantity_kg_min * MATCHING_CONFIG.MIN_QUANTITY_OVERLAP;
    if (listing.quantity_kg < minRequired) continue;

    // Rule 5: Availability check
    if (demand.needed_by) {
      const neededBy = new Date(demand.needed_by);
      const availableFrom = new Date(listing.available_from);
      if (availableFrom > neededBy) continue;
    }

    // Rule 6: Condition preference
    // Don't filter out, but note it for the LLM to consider
    
    candidates.push({
      candidate: {
        id: listing.id,
        waste_type: listing.waste_type,
        quantity_kg: listing.quantity_kg,
        condition: listing.condition,
        location_name: listing.location_name,
        distance_km: Math.round(distance * 10) / 10,
        available_from: listing.available_from,
        available_until: listing.available_until,
      },
      distance_km: Math.round(distance * 10) / 10,
      listing_id: listing.id,
    });
  }

  return candidates
    .sort((a, b) => a.distance_km - b.distance_km)
    .slice(0, MATCHING_CONFIG.MAX_SHORTLIST_SIZE);
}
