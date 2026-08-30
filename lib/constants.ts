import { WasteType, WasteCondition, UseCase, UserRole } from './types';

// ─── Waste Types ───────────────────────────────────────────────────
export const WASTE_TYPES: Record<WasteType, { label: string; emoji: string; description: string; color: string }> = {
  maize_stalks: {
    label: 'Maize Stalks',
    emoji: '🌽',
    description: 'Dried stalks and stover from maize harvests. Used in animal feed, briquettes, and compost.',
    color: '#f59e0b',
  },
  maize_cobs: {
    label: 'Maize Cobs',
    emoji: '🌾',
    description: 'Cleaned cobs after grain removal. Ideal for briquette production and industrial processing.',
    color: '#d97706',
  },
  sugarcane_bagasse: {
    label: 'Sugarcane Bagasse',
    emoji: '🎋',
    description: 'Fibrous residue from sugarcane juice extraction. Excellent for biogas, briquettes, and paper pulp.',
    color: '#22c55e',
  },
  coffee_husks: {
    label: 'Coffee Husks',
    emoji: '☕',
    description: 'Outer shells from coffee cherry processing. Used as fuel, compost, and mushroom substrate.',
    color: '#92400e',
  },
};

export const WASTE_TYPE_OPTIONS = Object.entries(WASTE_TYPES).map(([value, { label, emoji }]) => ({
  value: value as WasteType,
  label: `${emoji} ${label}`,
}));

// ─── Waste Conditions ──────────────────────────────────────────────
export const WASTE_CONDITIONS: Record<WasteCondition | 'any', { label: string; description: string }> = {
  fresh: { label: 'Fresh', description: 'Recently harvested, high moisture content' },
  dried: { label: 'Dried', description: 'Sun-dried or air-dried, low moisture' },
  partially_dried: { label: 'Partially Dried', description: 'Some drying done, moderate moisture' },
  mixed: { label: 'Mixed', description: 'Mix of fresh and dried material' },
  any: { label: 'Any Condition', description: 'No preference on condition' },
};

// ─── Use Cases ─────────────────────────────────────────────────────
export const USE_CASES: Record<UseCase, { label: string; emoji: string; description: string }> = {
  animal_feed: {
    label: 'Animal Feed',
    emoji: '🐄',
    description: 'Livestock feed production — dairy, poultry, pig feed',
  },
  biogas: {
    label: 'Biogas',
    emoji: '⚡',
    description: 'Anaerobic digestion for biogas/energy generation',
  },
  briquettes: {
    label: 'Briquettes',
    emoji: '🔥',
    description: 'Compressed fuel briquettes as charcoal alternative',
  },
  compost: {
    label: 'Compost / Fertilizer',
    emoji: '🌱',
    description: 'Organic compost and fertilizer production',
  },
  other: {
    label: 'Other',
    emoji: '🔄',
    description: 'Paper pulp, mushroom substrate, industrial use, etc.',
  },
};

// ─── User Roles ────────────────────────────────────────────────────
export const USER_ROLES: Record<UserRole, { label: string; description: string }> = {
  farmer: { label: 'Farmer', description: 'I produce crop waste and want to sell it' },
  buyer: { label: 'Buyer', description: 'I need crop waste for my business' },
  both: { label: 'Both', description: 'I both produce and buy crop waste' },
  aggregator: { label: 'Aggregator / Co-op', description: 'I manage listings for multiple farmers' },
};

// ─── Kenyan Counties ───────────────────────────────────────────────
export const KENYAN_COUNTIES = [
  'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet',
  'Embu', 'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado',
  'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga',
  'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia',
  'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit',
  'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi',
  'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua',
  'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River',
  'Tharaka-Nithi', 'Trans-Nzoia', 'Turkana', 'Uasin Gishu',
  'Vihiga', 'Wajir', 'West Pokot',
] as const;

// ─── Matching Config ───────────────────────────────────────────────
export const MATCHING_CONFIG = {
  /** Default maximum distance in km for matching */
  DEFAULT_MAX_DISTANCE_KM: 50,
  /** Minimum quantity overlap percentage (0–1) */
  MIN_QUANTITY_OVERLAP: 0.1,
  /** Maximum shortlist size before LLM ranking */
  MAX_SHORTLIST_SIZE: 20,
  /** Groq model for LLM ranking */
  GROQ_MODEL: 'llama-3.3-70b-versatile',
} as const;

// ─── Units ─────────────────────────────────────────────────────────
export const QUANTITY_UNITS = [
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'tons', label: 'Metric Tons' },
  { value: 'bags', label: 'Bags (approx. 90kg)' },
] as const;

// ─── Status Colors ─────────────────────────────────────────────────
export const STATUS_COLORS = {
  active: '#22c55e',
  matched: '#3b82f6',
  expired: '#6b7280',
  withdrawn: '#ef4444',
  fulfilled: '#8b5cf6',
  pending: '#f59e0b',
  accepted: '#22c55e',
  rejected: '#ef4444',
  completed: '#8b5cf6',
} as const;
