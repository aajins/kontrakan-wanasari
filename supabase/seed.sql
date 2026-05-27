-- ─────────────────────────────────────────────────────────────────────────────
-- Kontrakan Wanasari – Seed Data
-- Run AFTER 001_init.sql in Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Facilities ────────────────────────────────────────────────────────────────
INSERT INTO facilities (id, name) VALUES
  ('f1',  'Kamar Mandi Dalam'),
  ('f2',  'Kamar Mandi Luar'),
  ('f3',  'Listrik PLN 900W'),
  ('f4',  'Listrik PLN 1300W'),
  ('f5',  'Parkir Motor'),
  ('f6',  'Parkir Motor & Mobil'),
  ('f7',  'Air Sumur'),
  ('f8',  'Air PDAM'),
  ('f9',  'Dapur'),
  ('f10', 'Dapur Bersama'),
  ('f13', 'Teras')
ON CONFLICT (id) DO NOTHING;

-- ── Kontrakan 1: Wanasari Indah ───────────────────────────────────────────────
INSERT INTO kontrakans (id, title, slug, location, address, whatsapp, owner_name, description, images, units, coordinates, nearby_places, rating, review_count, featured, created_at)
VALUES (
  '1',
  'Kontrakan Wanasari Indah',
  'wanasari-indah',
  'Wanasari, Telukjambe Barat',
  'Jl. Wanasari No. 12, Desa Wanasari, Kec. Telukjambe Barat, Karawang',
  '6281234567890',
  'Pak Hendra',
  'Kontrakan strategis di area Wanasari dengan akses mudah ke kawasan industri Karawang. Lingkungan aman, bersih, dan nyaman untuk keluarga maupun karyawan industri.',
  '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"]'::jsonb,
  '[{"id":"1a","type":"2 Petak","price":700000,"available":true,"facilities":[{"id":"f1","name":"Kamar Mandi Dalam"},{"id":"f3","name":"Listrik PLN 900W"},{"id":"f5","name":"Parkir Motor"},{"id":"f7","name":"Air Sumur"}],"description":"Unit 2 petak ideal untuk pasangan atau karyawan single. Ruang tamu dan kamar tidur terpisah.","size":"30 m²","maxOccupants":2},{"id":"1b","type":"3 Petak","price":1000000,"available":true,"facilities":[{"id":"f1","name":"Kamar Mandi Dalam"},{"id":"f4","name":"Listrik PLN 1300W"},{"id":"f6","name":"Parkir Motor & Mobil"},{"id":"f7","name":"Air Sumur"},{"id":"f9","name":"Dapur"}],"description":"Unit 3 petak cocok untuk keluarga kecil. Dilengkapi dapur dan ruang keluarga yang luas.","size":"45 m²","maxOccupants":4}]'::jsonb,
  '{"lat":-6.3244,"lng":107.3063}'::jsonb,
  '["3 km dari Stasiun Whoosh Karawang","5 km dari Grand Outlet Karawang","2 km dari KIM Karawang"]'::jsonb,
  4.8,
  24,
  true,
  '2024-01-15'
) ON CONFLICT (id) DO NOTHING;

-- ── Kontrakan 2: Mawar Asri ───────────────────────────────────────────────────
INSERT INTO kontrakans (id, title, slug, location, address, whatsapp, owner_name, description, images, units, coordinates, nearby_places, rating, review_count, featured, created_at)
VALUES (
  '2',
  'Kontrakan Mawar Asri',
  'mawar-asri',
  'Wanasari, Telukjambe Barat',
  'Gg. Mawar No. 5, Desa Wanasari, Kec. Telukjambe Barat, Karawang',
  '6289876543210',
  'Bu Sari',
  'Hunian nyaman dengan desain sederhana namun fungsional. Lokasi dekat akses tol Karawang Barat, cocok untuk karyawan yang mobilitas tinggi.',
  '["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80","https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"]'::jsonb,
  '[{"id":"2a","type":"2 Petak","price":650000,"available":false,"facilities":[{"id":"f2","name":"Kamar Mandi Luar"},{"id":"f3","name":"Listrik PLN 900W"},{"id":"f5","name":"Parkir Motor"}],"description":"Unit standar 2 petak dengan harga terjangkau.","size":"28 m²","maxOccupants":2},{"id":"2b","type":"3 Petak","price":950000,"available":true,"facilities":[{"id":"f1","name":"Kamar Mandi Dalam"},{"id":"f4","name":"Listrik PLN 1300W"},{"id":"f5","name":"Parkir Motor"},{"id":"f10","name":"Dapur Bersama"}],"description":"Unit luas dengan akses dapur bersama yang bersih.","size":"42 m²","maxOccupants":4}]'::jsonb,
  '{"lat":-6.318,"lng":107.301}'::jsonb,
  '["4 km dari Stasiun Whoosh Karawang","6 km dari Grand Outlet Karawang","1.5 km dari KIIC Karawang"]'::jsonb,
  4.5,
  18,
  true,
  '2024-02-20'
) ON CONFLICT (id) DO NOTHING;

-- ── Kontrakan 3: Sejahtera Jaya ───────────────────────────────────────────────
INSERT INTO kontrakans (id, title, slug, location, address, whatsapp, owner_name, description, images, units, coordinates, nearby_places, rating, review_count, featured, created_at)
VALUES (
  '3',
  'Kontrakan Sejahtera Jaya',
  'sejahtera-jaya',
  'Wanasari, Telukjambe Barat',
  'Jl. Sejahtera Blok C No. 8, Desa Wanasari, Kec. Telukjambe Barat, Karawang',
  '6281122334455',
  'Pak Budi',
  'Kontrakan baru renovasi dengan fasilitas lengkap. Keamanan 24 jam dan lingkungan yang tenang jauh dari kebisingan jalan besar.',
  '["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80","https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80","https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"]'::jsonb,
  '[{"id":"3a","type":"2 Petak","price":750000,"available":true,"facilities":[{"id":"f1","name":"Kamar Mandi Dalam"},{"id":"f3","name":"Listrik PLN 900W"},{"id":"f5","name":"Parkir Motor"},{"id":"f8","name":"Air PDAM"}],"description":"Unit 2 petak baru renovasi dengan cat fresh dan kondisi terawat.","size":"32 m²","maxOccupants":2},{"id":"3b","type":"3 Petak","price":1100000,"available":true,"facilities":[{"id":"f1","name":"Kamar Mandi Dalam"},{"id":"f4","name":"Listrik PLN 1300W"},{"id":"f6","name":"Parkir Motor & Mobil"},{"id":"f8","name":"Air PDAM"},{"id":"f9","name":"Dapur"},{"id":"f13","name":"Teras"}],"description":"Unit premium dengan teras pribadi dan fasilitas lengkap.","size":"50 m²","maxOccupants":5}]'::jsonb,
  '{"lat":-6.33,"lng":107.31}'::jsonb,
  '["3.5 km dari Stasiun Whoosh Karawang","4 km dari Grand Outlet Karawang","2.5 km dari GIIC Karawang"]'::jsonb,
  4.9,
  31,
  false,
  '2024-03-10'
) ON CONFLICT (id) DO NOTHING;

-- ── Kontrakan 4: Melati Permai ────────────────────────────────────────────────
INSERT INTO kontrakans (id, title, slug, location, address, whatsapp, owner_name, description, images, units, coordinates, nearby_places, rating, review_count, featured, created_at)
VALUES (
  '4',
  'Kontrakan Melati Permai',
  'melati-permai',
  'Wanasari, Telukjambe Barat',
  'Jl. Melati RT 03 No. 22, Desa Wanasari, Kec. Telukjambe Barat, Karawang',
  '6285566778899',
  'Pak Agus',
  'Kontrakan dengan konsep bersih dan rapi. Tersedia dalam dua tipe dengan harga kompetitif. Lingkungan keluarga yang ramah dan aman.',
  '["https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=80","https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80","https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80"]'::jsonb,
  '[{"id":"4a","type":"2 Petak","price":680000,"available":true,"facilities":[{"id":"f2","name":"Kamar Mandi Luar"},{"id":"f3","name":"Listrik PLN 900W"},{"id":"f5","name":"Parkir Motor"},{"id":"f7","name":"Air Sumur"}],"description":"Unit ekonomis dengan kondisi terawat baik.","size":"28 m²","maxOccupants":2},{"id":"4b","type":"3 Petak","price":980000,"available":false,"facilities":[{"id":"f1","name":"Kamar Mandi Dalam"},{"id":"f4","name":"Listrik PLN 1300W"},{"id":"f5","name":"Parkir Motor"},{"id":"f7","name":"Air Sumur"},{"id":"f9","name":"Dapur"}],"description":"Unit keluarga dengan ruang yang cukup luas.","size":"44 m²","maxOccupants":4}]'::jsonb,
  '{"lat":-6.326,"lng":107.308}'::jsonb,
  '["4 km dari Stasiun Whoosh Karawang","5.5 km dari Grand Outlet Karawang","3 km dari KIM Karawang"]'::jsonb,
  4.6,
  15,
  false,
  '2024-04-05'
) ON CONFLICT (id) DO NOTHING;
