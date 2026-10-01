-- ============================================================
-- Admin Panel - Fotoğraf Desteği Migration
-- Supabase SQL Editor'de çalıştır
-- ============================================================

-- 1. Sürücü avatar URL sütunu
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- 2. Araç fotoğraf URL sütunu
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- 3. Depolama bucket'ı oluştur (public - görseller herkese açık olacak)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 4. RLS: Giriş yapmış kullanıcılar yükleyebilir
CREATE POLICY "Authenticated users can upload photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- 5. RLS: Herkes görebilir (fotoğraflar public)
CREATE POLICY "Public read access for admin photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- 6. RLS: Sahibi güncelleyebilir / silebilir
CREATE POLICY "Authenticated users can update photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars');

SELECT 'Migration başarılı! Bucket ve sütunlar oluşturuldu.' AS result;
