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

const INITIAL_LISTINGS: WasteListing[] = [];

const INITIAL_DEMANDS: BuyerDemand[] = [];

const INITIAL_MATCHES: Match[] = [];

const INITIAL_MESSAGES: Message[] = [];

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
