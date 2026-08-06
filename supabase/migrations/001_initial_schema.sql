-- ============================================================
-- Fia & Sepri Wedding Invitation — Initial Schema
-- Run this SQL in your Supabase SQL Editor.
-- This script ONLY creates NEW tables; it does NOT modify
-- or delete any existing tables.
-- ============================================================

-- 1. Couples
CREATE TABLE IF NOT EXISTS couples (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  groom_name text NOT NULL,
  bride_name text NOT NULL,
  groom_description text,
  bride_description text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

ALTER TABLE couples ENABLE ROW LEVEL SECURITY;

-- Public can read couples
CREATE POLICY "Public can read couples"
  ON couples FOR SELECT
  USING (true);

-- Authenticated users can do everything
CREATE POLICY "Authenticated users can manage couples"
  ON couples FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 2. Events
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  event_type text NOT NULL,
  location text,
  address text,
  event_date timestamptz,
  created_at timestamp DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read events"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage events"
  ON events FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 3. RSVPs
CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  attendance_status text,
  total_guest integer DEFAULT 1,
  created_at timestamp DEFAULT now()
);

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read rsvps"
  ON rsvps FOR SELECT
  USING (true);

-- Public can INSERT rsvps (guest submission from landing page)
CREATE POLICY "Public can insert rsvps"
  ON rsvps FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage rsvps"
  ON rsvps FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 4. Wishes
CREATE TABLE IF NOT EXISTS wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  message text,
  created_at timestamp DEFAULT now()
);

ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read wishes"
  ON wishes FOR SELECT
  USING (true);

-- Public can INSERT wishes (guest submission from landing page)
CREATE POLICY "Public can insert wishes"
  ON wishes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage wishes"
  ON wishes FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 5. Galleries
CREATE TABLE IF NOT EXISTS galleries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  created_at timestamp DEFAULT now()
);

ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read galleries"
  ON galleries FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage galleries"
  ON galleries FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 6. Settings
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  music_url text,
  theme_color text,
  created_at timestamp DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read settings"
  ON settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage settings"
  ON settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- Seed data (optional) — Insert default couple and settings
-- ============================================================
INSERT INTO couples (groom_name, bride_name, groom_description, bride_description)
VALUES (
  'Sepri',
  'Fia',
  'Putra dari Bapak ... & Ibu ...',
  'Putri dari Bapak ... & Ibu ...'
);

INSERT INTO events (title, event_type, location, address, event_date)
VALUES
  ('Akad Nikah', 'akad', 'Masjid Al-Ikhlas', 'Jl. Contoh No. 1, Jakarta', '2026-12-20T08:00:00+07:00'),
  ('Resepsi', 'resepsi', 'Gedung Serbaguna', 'Jl. Contoh No. 2, Jakarta', '2026-12-20T11:00:00+07:00');

INSERT INTO settings (music_url, theme_color)
VALUES ('', '#1a365d');
