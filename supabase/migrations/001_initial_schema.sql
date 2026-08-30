-- MazaoLoop Database Schema
-- Run this migration in Supabase SQL Editor to set up the initial schema.

-- ─── Extensions ────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Custom Types ──────────────────────────────────────────────────
CREATE TYPE user_role AS ENUM ('farmer', 'buyer', 'both', 'aggregator');
CREATE TYPE waste_type AS ENUM ('maize_stalks', 'maize_cobs', 'sugarcane_bagasse', 'coffee_husks');
CREATE TYPE waste_condition AS ENUM ('fresh', 'dried', 'partially_dried', 'mixed');
CREATE TYPE use_case_type AS ENUM ('animal_feed', 'biogas', 'briquettes', 'compost', 'other');
CREATE TYPE listing_status AS ENUM ('active', 'matched', 'expired', 'withdrawn');
CREATE TYPE demand_status AS ENUM ('active', 'fulfilled', 'expired', 'withdrawn');
CREATE TYPE match_status AS ENUM ('pending', 'accepted', 'rejected', 'completed');

-- ─── Profiles ──────────────────────────────────────────────────────
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL DEFAULT '',
  role user_role NOT NULL DEFAULT 'farmer',
  organization_name TEXT,
  county TEXT NOT NULL DEFAULT '',
  sub_county TEXT DEFAULT '',
  latitude FLOAT8,
  longitude FLOAT8,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone_number)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone_number', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ─── Waste Listings ────────────────────────────────────────────────
CREATE TABLE waste_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farmer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  waste_type waste_type NOT NULL,
  quantity_kg NUMERIC NOT NULL CHECK (quantity_kg > 0),
  description TEXT,
  condition waste_condition NOT NULL DEFAULT 'mixed',
  available_from DATE NOT NULL DEFAULT CURRENT_DATE,
  available_until DATE,
  latitude FLOAT8 NOT NULL,
  longitude FLOAT8 NOT NULL,
  location_name TEXT NOT NULL DEFAULT '',
  status listing_status NOT NULL DEFAULT 'active',
  images TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER waste_listings_updated_at
  BEFORE UPDATE ON waste_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_waste_listings_type ON waste_listings(waste_type);
CREATE INDEX idx_waste_listings_status ON waste_listings(status);
CREATE INDEX idx_waste_listings_farmer ON waste_listings(farmer_id);
CREATE INDEX idx_waste_listings_location ON waste_listings(latitude, longitude);

-- ─── Buyer Demands ─────────────────────────────────────────────────
CREATE TABLE buyer_demands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  waste_type waste_type NOT NULL,
  quantity_kg_min NUMERIC NOT NULL CHECK (quantity_kg_min > 0),
  quantity_kg_max NUMERIC NOT NULL CHECK (quantity_kg_max >= quantity_kg_min),
  preferred_condition TEXT NOT NULL DEFAULT 'any',
  use_case use_case_type NOT NULL DEFAULT 'other',
  description TEXT,
  needed_by DATE,
  latitude FLOAT8 NOT NULL,
  longitude FLOAT8 NOT NULL,
  location_name TEXT NOT NULL DEFAULT '',
  max_distance_km NUMERIC NOT NULL DEFAULT 50,
  status demand_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER buyer_demands_updated_at
  BEFORE UPDATE ON buyer_demands
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_buyer_demands_type ON buyer_demands(waste_type);
CREATE INDEX idx_buyer_demands_status ON buyer_demands(status);
CREATE INDEX idx_buyer_demands_buyer ON buyer_demands(buyer_id);

-- ─── Matches ───────────────────────────────────────────────────────
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES waste_listings(id) ON DELETE CASCADE,
  demand_id UUID NOT NULL REFERENCES buyer_demands(id) ON DELETE CASCADE,
  match_score NUMERIC NOT NULL CHECK (match_score >= 0 AND match_score <= 100),
  match_reasoning TEXT NOT NULL DEFAULT '',
  distance_km NUMERIC NOT NULL DEFAULT 0,
  status match_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(listing_id, demand_id)
);

CREATE INDEX idx_matches_listing ON matches(listing_id);
CREATE INDEX idx_matches_demand ON matches(demand_id);
CREATE INDEX idx_matches_status ON matches(status);

-- ─── Messages ──────────────────────────────────────────────────────
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_messages_match ON messages(match_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);

-- ─── Haversine Distance Function ───────────────────────────────────
CREATE OR REPLACE FUNCTION haversine_distance(
  lat1 FLOAT8, lon1 FLOAT8,
  lat2 FLOAT8, lon2 FLOAT8
)
RETURNS FLOAT8 AS $$
DECLARE
  R FLOAT8 := 6371; -- Earth radius in km
  dlat FLOAT8;
  dlon FLOAT8;
  a FLOAT8;
  c FLOAT8;
BEGIN
  dlat := RADIANS(lat2 - lat1);
  dlon := RADIANS(lon2 - lon1);
  a := SIN(dlat / 2) * SIN(dlat / 2) +
       COS(RADIANS(lat1)) * COS(RADIANS(lat2)) *
       SIN(dlon / 2) * SIN(dlon / 2);
  c := 2 * ATAN2(SQRT(a), SQRT(1 - a));
  RETURN R * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ─── Row Level Security ────────────────────────────────────────────

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Waste Listings
ALTER TABLE waste_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active listings are viewable by everyone"
  ON waste_listings FOR SELECT
  USING (true);

CREATE POLICY "Farmers can create own listings"
  ON waste_listings FOR INSERT
  WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Farmers can update own listings"
  ON waste_listings FOR UPDATE
  USING (auth.uid() = farmer_id)
  WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Farmers can delete own listings"
  ON waste_listings FOR DELETE
  USING (auth.uid() = farmer_id);

-- Buyer Demands
ALTER TABLE buyer_demands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active demands are viewable by everyone"
  ON buyer_demands FOR SELECT
  USING (true);

CREATE POLICY "Buyers can create own demands"
  ON buyer_demands FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Buyers can update own demands"
  ON buyer_demands FOR UPDATE
  USING (auth.uid() = buyer_id)
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Buyers can delete own demands"
  ON buyer_demands FOR DELETE
  USING (auth.uid() = buyer_id);

-- Matches
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view matches they are part of"
  ON matches FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM waste_listings wl
      WHERE wl.id = matches.listing_id AND wl.farmer_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM buyer_demands bd
      WHERE bd.id = matches.demand_id AND bd.buyer_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create matches"
  ON matches FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Match participants can update status"
  ON matches FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM waste_listings wl
      WHERE wl.id = matches.listing_id AND wl.farmer_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM buyer_demands bd
      WHERE bd.id = matches.demand_id AND bd.buyer_id = auth.uid()
    )
  );

-- Messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Match participants can view messages"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM matches m
      JOIN waste_listings wl ON wl.id = m.listing_id
      JOIN buyer_demands bd ON bd.id = m.demand_id
      WHERE m.id = messages.match_id
      AND (wl.farmer_id = auth.uid() OR bd.buyer_id = auth.uid())
    )
  );

CREATE POLICY "Match participants can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM matches m
      JOIN waste_listings wl ON wl.id = m.listing_id
      JOIN buyer_demands bd ON bd.id = m.demand_id
      WHERE m.id = messages.match_id
      AND (wl.farmer_id = auth.uid() OR bd.buyer_id = auth.uid())
    )
  );

-- ─── Enable Realtime ───────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE matches;
