// ─── Enums & Constants ─────────────────────────────────────────────
export type WasteType = 'maize_stalks' | 'maize_cobs' | 'sugarcane_bagasse' | 'coffee_husks';
export type WasteCondition = 'fresh' | 'dried' | 'partially_dried' | 'mixed';
export type UseCase = 'animal_feed' | 'biogas' | 'briquettes' | 'compost' | 'other';
export type UserRole = 'farmer' | 'buyer' | 'both' | 'aggregator';
export type ListingStatus = 'active' | 'matched' | 'expired' | 'withdrawn';
export type DemandStatus = 'active' | 'fulfilled' | 'expired' | 'withdrawn';
export type MatchStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

// ─── Database Models ───────────────────────────────────────────────
export interface Profile {
  id: string;
  full_name: string;
  phone_number: string;
  role: UserRole;
  organization_name: string | null;
  county: string;
  sub_county: string;
  latitude: number | null;
  longitude: number | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface WasteListing {
  id: string;
  farmer_id: string;
  waste_type: WasteType;
  quantity_kg: number;
  description: string | null;
  condition: WasteCondition;
  available_from: string;
  available_until: string | null;
  latitude: number;
  longitude: number;
  location_name: string;
  status: ListingStatus;
  images: string[] | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  farmer?: Profile;
}

export interface BuyerDemand {
  id: string;
  buyer_id: string;
  waste_type: WasteType;
  quantity_kg_min: number;
  quantity_kg_max: number;
  preferred_condition: WasteCondition | 'any';
  use_case: UseCase;
  description: string | null;
  needed_by: string | null;
  latitude: number;
  longitude: number;
  location_name: string;
  max_distance_km: number;
  status: DemandStatus;
  created_at: string;
  updated_at: string;
  // Joined fields
  buyer?: Profile;
}

export interface Match {
  id: string;
  listing_id: string;
  demand_id: string;
  match_score: number;
  match_reasoning: string;
  distance_km: number;
  status: MatchStatus;
  created_at: string;
  // Joined fields
  listing?: WasteListing;
  demand?: BuyerDemand;
}

export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  // Joined fields
  sender?: Profile;
}

// ─── API Types ─────────────────────────────────────────────────────
export interface MatchCandidate {
  id: string;
  waste_type: WasteType;
  quantity_kg: number;
  condition: WasteCondition;
  location_name: string;
  distance_km: number;
  available_from?: string;
  available_until?: string | null;
  needed_by?: string | null;
  use_case?: UseCase;
  preferred_condition?: WasteCondition | 'any';
  quantity_kg_min?: number;
  quantity_kg_max?: number;
}

export interface LLMMatchResult {
  id: string;
  score: number;
  reasoning: string;
}

export interface MatchingRequest {
  type: 'listing' | 'demand';
  id: string;
}

export interface MatchingResponse {
  matches: LLMMatchResult[];
  total_candidates: number;
  shortlisted: number;
}
