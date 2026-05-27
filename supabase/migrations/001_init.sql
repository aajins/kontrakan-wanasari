-- ─────────────────────────────────────────────────────────────────────────────
-- Kontrakan Wanasari – Initial Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- Facilities master table
-- Stores reusable facility options (Kamar Mandi Dalam, Listrik 900W, etc.)
CREATE TABLE IF NOT EXISTS facilities (
  id   TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Kontrakans table
-- `units` and `images` stored as JSONB to avoid over-normalization
CREATE TABLE IF NOT EXISTS kontrakans (
  id            TEXT        PRIMARY KEY,
  title         TEXT        NOT NULL,
  slug          TEXT        NOT NULL,
  location      TEXT        NOT NULL,
  address       TEXT        NOT NULL,
  whatsapp      TEXT        NOT NULL,
  owner_name    TEXT        NOT NULL,
  description   TEXT        NOT NULL,
  images        JSONB       NOT NULL DEFAULT '[]'::jsonb,
  units         JSONB       NOT NULL DEFAULT '[]'::jsonb,
  coordinates   JSONB,
  nearby_places JSONB                DEFAULT '[]'::jsonb,
  rating        DECIMAL(3,1),
  review_count  INTEGER              DEFAULT 0,
  featured      BOOLEAN              DEFAULT FALSE,
  created_at    TEXT        NOT NULL DEFAULT to_char(CURRENT_DATE, 'YYYY-MM-DD'),
  updated_at    TIMESTAMPTZ          DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_kontrakans_slug       ON kontrakans (slug);
CREATE INDEX        IF NOT EXISTS idx_kontrakans_featured   ON kontrakans (featured);
CREATE INDEX        IF NOT EXISTS idx_kontrakans_created_at ON kontrakans (created_at DESC);
