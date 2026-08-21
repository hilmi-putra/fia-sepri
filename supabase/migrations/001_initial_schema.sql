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

-- 7. Gift Recommendations
CREATE TABLE IF NOT EXISTS gift_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  total_needed integer NOT NULL DEFAULT 1,
  total_bought integer NOT NULL DEFAULT 0,
  image_url text,
  purchase_link text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

ALTER TABLE gift_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read gift recommendations"
  ON gift_recommendations FOR SELECT
  USING (true);

CREATE POLICY "Public can update gift recommendations"
  ON gift_recommendations FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage gift recommendations"
  ON gift_recommendations FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 8. Gift Purchases
CREATE TABLE IF NOT EXISTS gift_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gift_id uuid REFERENCES gift_recommendations(id) ON DELETE CASCADE,
  buyer_name text NOT NULL,
  whatsapp_number text NOT NULL,
  email text,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamp DEFAULT now()
);

ALTER TABLE gift_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read gift purchases"
  ON gift_purchases FOR SELECT
  USING (true);

-- Public can INSERT purchases
CREATE POLICY "Public can insert gift purchases"
  ON gift_purchases FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage gift purchases"
  ON gift_purchases FOR ALL
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

INSERT INTO gift_recommendations (name, description, price, total_needed, total_bought, image_url, purchase_link)
VALUES
  ('Mirror', 'Long Mirror', 500000, 3, 1, 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://example.com/buy-mirror'),
  ('Bedcover', 'King Size White Bedcover', 2500000, 4, 0, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://example.com/buy-bedcover');
