-- Keep gift buyer details private. The public purchase endpoint only needs INSERT.
DROP POLICY IF EXISTS "Public can read gift purchases" ON gift_purchases;

CREATE POLICY "Authenticated users can read gift purchases"
  ON gift_purchases FOR SELECT
  USING (auth.role() = 'authenticated');
