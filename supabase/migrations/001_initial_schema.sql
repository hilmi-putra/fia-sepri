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

  CREATE POLICY "Authenticated users can read gift purchases"
    ON gift_purchases FOR SELECT
    USING (auth.role() = 'authenticated');

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
  ('Mini Espresso', 'Mini Espresso', 410000, 3, 0, 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Wedding%20Gift/mini%20espresso.png?updatedAt=1789223784895', 'https://id.shp.ee/9kfHK6xe'),
  ('Papan Setrika', 'Papan Setrika', 100000, 3, 0, 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Wedding%20Gift/meja%20setrika.png?updatedAt=1789223786484', 'https://id.shp.ee/E8v3DtLE'),
  ('Tempat Beras', 'Tempat Beras', 107000, 3, 0, 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Wedding%20Gift/tempat%20beras.png?updatedAt=1789223790481', 'https://id.shp.ee/RrjF6fay'),
  ('Rice Cooker', 'Rice Cooker', 296000, 3, 0, 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Wedding%20Gift/rice%20cooker.png?updatedAt=1789223789913', 'https://id.shp.ee/GQnprGHC'),
  ('Microwave', 'Microwave', 1047000, 3, 0, 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Wedding%20Gift/microwave.png?updatedAt=1789223790879', 'https://id.shp.ee/Vwhtvovk'),
  ('Set Pisau', 'Set Pisau', 90000, 3, 0, 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Wedding%20Gift/set%20pisau.png?updatedAt=1789223791359', 'https://id.shp.ee/JEt3wtRP'),
  ('Diffuser', 'Diffuser', 120000, 3, 0, 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Wedding%20Gift/humidifer.png?updatedAt=1789223789448', 'https://id.shp.ee/ot5HhoW1'),
  ('Alat Pel', 'Alat Pel', 198000, 3, 0, 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Wedding%20Gift/alat%20pel.png?updatedAt=1789223788474', 'https://id.shp.ee/EpuvBWqh'),
  ('Set Alat Masak', 'Set Alat Masak', 106000, 3, 0, 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Wedding%20Gift/set%20alat%20masak.png?updatedAt=1789223791022', 'https://id.shp.ee/2M8ytLbA'),
  ('Wajan', 'Wajan', 192000, 3, 0, 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Wedding%20Gift/wajan.png?updatedAt=1789223790808', 'https://id.shp.ee/JULeFYtu');

