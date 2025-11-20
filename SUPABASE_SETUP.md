# Setup Supabase untuk OSIS Website

## Step 1: Buat Project Supabase

1. Kunjungi [supabase.com](https://supabase.com)
2. Login atau buat akun baru
3. Klik **"New Project"**
4. Isi form:
   - **Name**: `osis-smans13depok`
   - **Database Password**: Buat password yang kuat & catat!
   - **Region**: Singapore (paling dekat)
5. Klik **"Create new project"** dan tunggu ~2 menit

## Step 2: Setup Database Schema

Setelah project selesai dibuat:

1. Buka **SQL Editor** (di sidebar kiri)
2. Klik **"New Query"**
3. Copy-paste query berikut dan jalankan:

```sql
-- ========================================
-- CREATE ARTICLES TABLE FROM SCRATCH
-- ========================================

-- Create articles table
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'Umum',
  author TEXT DEFAULT 'Admin OSIS',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes untuk performa query
CREATE INDEX articles_published_idx ON articles(published);
CREATE INDEX articles_created_at_idx ON articles(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- ========================================
-- CREATE RLS POLICIES
-- ========================================

-- Policy: Siapa pun bisa baca artikel yang published
CREATE POLICY "Public can read published articles" ON articles
  FOR SELECT
  USING (published = true);

-- Policy: Siapa pun bisa insert artikel (untuk admin)
CREATE POLICY "Anyone can create articles" ON articles
  FOR INSERT
  WITH CHECK (true);

-- Policy: Siapa pun bisa update artikel (untuk admin edit)
CREATE POLICY "Anyone can update articles" ON articles
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policy: Siapa pun bisa delete artikel (untuk admin delete)
CREATE POLICY "Anyone can delete articles" ON articles
  FOR DELETE
  USING (true);
```

✅ **Tabel siap digunakan!** Data bisa ditambahkan melalui admin dashboard.

## Step 2B: Setup Supabase Storage untuk Image Upload

Setelah membuat tabel articles, sekarang setup storage bucket untuk upload gambar:

1. Buka Supabase Dashboard
2. Di sidebar kiri, cari **Storage** → klik **Buckets**
3. Klik **New Bucket** dan isi:
   - **Name**: `article-images`
   - **Public bucket**: ✅ (Centang agar gambar bisa diakses public)
4. Klik **Create bucket**

Atau jalankan SQL berikut di SQL Editor untuk setup otomatis:

```sql
-- ========================================
-- SETUP STORAGE BUCKET & RLS POLICIES
-- ========================================

-- Create bucket for article images (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- CREATE RLS POLICIES FOR STORAGE
-- ========================================

-- Policy: Anyone can read (public) from article-images bucket
CREATE POLICY "Public can read article images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'article-images');

-- Policy: Anyone can upload to article-images bucket
CREATE POLICY "Anyone can upload article images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'article-images');

-- Policy: Anyone can update their article images
CREATE POLICY "Anyone can update article images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'article-images');

-- Policy: Anyone can delete article images
CREATE POLICY "Anyone can delete article images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'article-images');
```

✅ **Storage bucket siap digunakan!**

## Step 3: Dapatkan API Keys

1. Buka **Settings** → **API**
2. Cari section **Project URL** dan **Project API keys**
3. Copy:
   - **Project URL** → Ini untuk `VITE_SUPABASE_URL`
   - **anon public** key → Ini untuk `VITE_SUPABASE_ANON_KEY`

## Step 4: Setup Environment Variables

1. Di folder project, buat file `.env` (atau edit jika sudah ada)
2. Isi dengan:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Contoh:**
```env
VITE_SUPABASE_URL=https://abcdefg12345.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 5: Test Connection

1. Jalankan `npm run dev`
2. Buka http://localhost:5173/admin
3. Login: 
   - Email: `admin@osis-smans13depok.com`
   - Password: `admin123`
4. Coba tambah, edit, dan hapus artikel

Jika artikel muncul di halaman utama, berarti **sukses**! ✅

---

## Troubleshooting

### "Cannot connect to Supabase"
- Pastikan `.env` file sudah ada dengan URL dan key yang benar
- Restart dev server: `npm run dev`

### "RLS Policy Error"
- Buka Supabase Dashboard → Table Editor → articles
- Klik tombol RLS di atas tabel
- Pastikan policy sudah enabled

### Data tidak muncul
- Buka SQL Editor di Supabase
- Jalankan: `SELECT * FROM articles;`
- Pastikan ada data di tabel

---

**Note:** Untuk production, sebaiknya setup proper authentication dengan Supabase Auth dan atur RLS policies yang lebih ketat!
