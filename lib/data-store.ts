'use client';

import { useState, useEffect } from 'react';
import { WasteListing, BuyerDemand, Match, Message, Profile } from './types';
import { createClient } from './supabase/client';

// Initial baseline data for immediate interactive showcase
const INITIAL_PROFILES: Profile[] = [
  {
    id: 'usr_f1',
    full_name: 'Wanjiku Kamau',
    phone_number: '+254 712 345 678',
    role: 'farmer',
    organization_name: 'Githunguri Smallholders Coop',
    county: 'Kiambu',
    sub_county: 'Githunguri',
    latitude: -1.0568,
    longitude: 36.7788,
    avatar_url: null,
    created_at: '2026-08-10T08:00:00Z',
    updated_at: '2026-08-10T08:00:00Z',
  },
  {
    id: 'usr_b1',
    full_name: 'Dr. Kevin Mutua',
    phone_number: '+254 701 223 344',
    role: 'buyer',
    organization_name: 'GreenFlame Briquettes Ltd',
    county: 'Nakuru',
    sub_county: 'Nakuru Town West',
    latitude: -0.2833,
    longitude: 36.0667,
    avatar_url: null,
    created_at: '2026-08-01T10:00:00Z',
    updated_at: '2026-08-01T10:00:00Z',
  },
];

const INITIAL_LISTINGS: WasteListing[] = [
  {
    id: 'lst_1',
    farmer_id: 'usr_f1',
    waste_type: 'maize_stalks',
    quantity_kg: 12500,
    description: 'Post-harvest clean dry maize stover and stalks, baled and stacked under shed. Ready for transport.',
    condition: 'dried',
    available_from: '2026-08-25',
    available_until: '2026-09-30',
    latitude: -0.1742,
    longitude: 35.8644,
    location_name: 'Rongai, Nakuru County',
    status: 'active',
    images: [],
    created_at: '2026-08-26T08:30:00Z',
    updated_at: '2026-08-26T08:30:00Z',
    farmer: INITIAL_PROFILES[0],
  },
  {
    id: 'lst_2',
    farmer_id: 'usr_f1',
    waste_type: 'sugarcane_bagasse',
    quantity_kg: 28000,
    description: 'High-fiber freshly crushed sugarcane bagasse from local jaggery outgrowers. Suitable for biogas digestion.',
    condition: 'fresh',
    available_from: '2026-08-28',
    available_until: '2026-10-15',
    latitude: -0.1542,
    longitude: 35.1983,
    location_name: 'Muhoroni, Kisumu County',
    status: 'active',
    images: [],
    created_at: '2026-08-28T10:15:00Z',
    updated_at: '2026-08-28T10:15:00Z',
    farmer: INITIAL_PROFILES[0],
  },
  {
    id: 'lst_3',
    farmer_id: 'usr_f1',
    waste_type: 'coffee_husks',
    quantity_kg: 8500,
    description: 'Dry parchment and cherry husks from secondary milling factory. Uniform particle size, high calorific value.',
    condition: 'dried',
    available_from: '2026-08-20',
    available_until: '2026-10-01',
    latitude: -1.0568,
    longitude: 36.7788,
    location_name: 'Githunguri, Kiambu County',
    status: 'active',
    images: [],
    created_at: '2026-08-22T07:45:00Z',
    updated_at: '2026-08-22T07:45:00Z',
    farmer: INITIAL_PROFILES[0],
  },
];

const INITIAL_DEMANDS: BuyerDemand[] = [
  {
    id: 'dmd_1',
    buyer_id: 'usr_b1',
    waste_type: 'maize_stalks',
    quantity_kg_min: 5000,
    quantity_kg_max: 20000,
    preferred_condition: 'dried',
    use_case: 'briquettes',
    description: 'Urgently sourcing dry biomass (maize stalks/cobs) for smokeless eco-briquette factory in Nakuru.',
    needed_by: '2026-09-15',
    latitude: -0.2833,
    longitude: 36.0667,
    location_name: 'Nakuru Town Industrial Area',
    max_distance_km: 60,
    status: 'active',
    created_at: '2026-08-20T12:00:00Z',
    updated_at: '2026-08-20T12:00:00Z',
    buyer: INITIAL_PROFILES[1],
  },
  {
    id: 'dmd_2',
    buyer_id: 'usr_b1',
    waste_type: 'sugarcane_bagasse',
    quantity_kg_min: 15000,
    quantity_kg_max: 50000,
    preferred_condition: 'fresh',
    use_case: 'biogas',
    description: 'Continuous feedstock contract for commercial anaerobic digester and co-generation facility.',
    needed_by: '2026-10-01',
    latitude: -0.0917,
    longitude: 34.7680,
    location_name: 'Kisumu Eco-Industrial Park',
    max_distance_km: 75,
    status: 'active',
    created_at: '2026-08-22T15:30:00Z',
    updated_at: '2026-08-22T15:30:00Z',
    buyer: INITIAL_PROFILES[1],
  },
];

const INITIAL_MATCHES: Match[] = [
  {
    id: 'mtc_1',
    listing_id: 'lst_1',
    demand_id: 'dmd_1',
    match_score: 96,
    match_reasoning: 'Exceptional 96% match: Supply of 12.5T dry maize stalks in Rongai is only 21km from the Nakuru briquette factory. Dried condition perfectly satisfies buyer specification.',
    distance_km: 21.4,
    status: 'accepted',
    created_at: '2026-08-27T09:12:00Z',
    listing: INITIAL_LISTINGS[0],
    demand: INITIAL_DEMANDS[0],
  },
  {
    id: 'mtc_2',
    listing_id: 'lst_2',
    demand_id: 'dmd_2',
    match_score: 92,
    match_reasoning: 'Strong 92% match: 28 tons fresh sugarcane bagasse in Muhoroni matches Kisumu biogas plant feedstock demand. Direct highway haulage route under 50km.',
    distance_km: 48.6,
    status: 'pending',
    created_at: '2026-08-28T11:00:00Z',
    listing: INITIAL_LISTINGS[1],
    demand: INITIAL_DEMANDS[1],
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg_1',
    match_id: 'mtc_1',
    sender_id: 'usr_b1',
    content: 'Habari! We reviewed your 12.5T maize stalk listing in Rongai. The moisture condition is ideal for our briquetting line.',
    created_at: '2026-08-27T10:00:00Z',
    sender: INITIAL_PROFILES[1],
  },
  {
    id: 'msg_2',
    match_id: 'mtc_1',
    sender_id: 'usr_f1',
    content: 'Jambo Dr. Kevin! Everything is baled and stacked under our shed. Can your 10-ton truck load this Friday?',
    created_at: '2026-08-27T10:15:00Z',
    sender: INITIAL_PROFILES[0],
  },
];

// In-Memory Global Store with LocalStorage Persistence
export function getStoredListings(): WasteListing[] {
  if (typeof window === 'undefined') return INITIAL_LISTINGS;
  const stored = localStorage.getItem('mazaoloop_listings');
  if (!stored) {
    localStorage.setItem('mazaoloop_listings', JSON.stringify(INITIAL_LISTINGS));
    return INITIAL_LISTINGS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_LISTINGS;
  }
}

export function saveListing(listing: Omit<WasteListing, 'id' | 'created_at' | 'updated_at'>): WasteListing {
  const current = getStoredListings();
  const newListing: WasteListing = {
    ...listing,
    id: `lst_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const updated = [newListing, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem('mazaoloop_listings', JSON.stringify(updated));
  }
  return newListing;
}

export function getStoredDemands(): BuyerDemand[] {
  if (typeof window === 'undefined') return INITIAL_DEMANDS;
  const stored = localStorage.getItem('mazaoloop_demands');
  if (!stored) {
    localStorage.setItem('mazaoloop_demands', JSON.stringify(INITIAL_DEMANDS));
    return INITIAL_DEMANDS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_DEMANDS;
  }
}

export function saveDemand(demand: Omit<BuyerDemand, 'id' | 'created_at' | 'updated_at'>): BuyerDemand {
  const current = getStoredDemands();
  const newDemand: BuyerDemand = {
    ...demand,
    id: `dmd_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const updated = [newDemand, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem('mazaoloop_demands', JSON.stringify(updated));
  }
  return newDemand;
}

export function getStoredMatches(): Match[] {
  if (typeof window === 'undefined') return INITIAL_MATCHES;
  const stored = localStorage.getItem('mazaoloop_matches');
  if (!stored) {
    localStorage.setItem('mazaoloop_matches', JSON.stringify(INITIAL_MATCHES));
    return INITIAL_MATCHES;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_MATCHES;
  }
}

export function updateMatchStatus(matchId: string, status: Match['status']): Match[] {
  const current = getStoredMatches();
  const updated = current.map(m => m.id === matchId ? { ...m, status } : m);
  if (typeof window !== 'undefined') {
    localStorage.setItem('mazaoloop_matches', JSON.stringify(updated));
  }
  return updated;
}

export function getStoredMessages(matchId?: string): Message[] {
  if (typeof window === 'undefined') return INITIAL_MESSAGES;
  const stored = localStorage.getItem('mazaoloop_messages');
  const allMsgs: Message[] = stored ? JSON.parse(stored) : INITIAL_MESSAGES;
  if (!stored) {
    localStorage.setItem('mazaoloop_messages', JSON.stringify(INITIAL_MESSAGES));
  }
  if (matchId) {
    return allMsgs.filter(m => m.match_id === matchId);
  }
  return allMsgs;
}

export function saveMessage(msg: Omit<Message, 'id' | 'created_at'>): Message {
  const all = getStoredMessages();
  const newMsg: Message = {
    ...msg,
    id: `msg_${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  const updated = [...all, newMsg];
  if (typeof window !== 'undefined') {
    localStorage.setItem('mazaoloop_messages', JSON.stringify(updated));
  }
  return newMsg;
}
