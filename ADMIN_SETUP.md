# Admin Dashboard Setup Guide

## Setup Supabase untuk Admin Dashboard

### 1. Buat Project Supabase
1. Kunjungi [supabase.com](https://supabase.com)
2. Buat akun baru atau login
3. Klik "New Project"
4. Isi detail project:
   - Name: `osis-smans13depok-admin`
   - Database Password: (buat password yang kuat)
   - Region: pilih yang terdekat (Singapore/Asia)

### 2. Setup Database Schema
Setelah project dibuat, buka **SQL Editor** dan jalankan query berikut:

```sql
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

-- Create admin_users table (optional, for future auth)
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for articles (allow read for everyone, write for authenticated users)
CREATE POLICY "Allow public read access on articles" ON articles
  FOR SELECT USING (published = true);

CREATE POLICY "Allow authenticated insert on articles" ON articles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on articles" ON articles
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on articles" ON articles
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO articles (title, excerpt, content, image_url, category, published) VALUES
('Selamat Datang di Website OSIS', 'Website resmi OSIS SMAN 13 Depok telah diluncurkan dengan fitur-fitur terbaru untuk kemudahan akses informasi.', 'Konten lengkap artikel selamat datang...', '/Tangkapan_Layar_2025-11-19_pukul_20.11.45.png', 'Umum', true),
('Program Kerja OSIS 2024', 'Berbagai program kerja OSIS yang akan dijalankan untuk meningkatkan kualitas siswa SMAN 13 Depok.', 'Detail program kerja OSIS...', '/Tangkapan_Layar_2025-11-19_pukul_20.12.01.png', 'Organisasi', true);
```

### 3. Setup Environment Variables
1. Copy file `.env.example` menjadi `.env`
2. Isi dengan data dari Supabase Dashboard:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Cara mendapatkan URL dan Key:**
- Buka Supabase Dashboard → Settings → API
- Copy "Project URL" untuk `VITE_SUPABASE_URL`
- Copy "anon public" key untuk `VITE_SUPABASE_ANON_KEY`

### 4. Test Admin Dashboard
1. Jalankan `npm run dev`
2. Kunjungi `http://localhost:5173/admin`
3. Login dengan credentials demo:
   - Email: `admin@osis-smans13depok.com`
   - Password: `admin123`

### 5. Fitur Admin Dashboard
- ✅ Tambah artikel baru
- ✅ Edit artikel existing
- ✅ Publish/Unpublish artikel
- ✅ Hapus artikel
- ✅ Real-time data dari Supabase
- ✅ Responsive design
- ✅ Form validation

### 6. Real-time Features
Dashboard ini menggunakan Supabase real-time, jadi perubahan akan langsung terlihat di website utama tanpa perlu refresh.

### Troubleshooting
- Jika tidak bisa connect ke Supabase, cek environment variables
- Jika data tidak muncul, pastikan RLS policies sudah benar
- Untuk production, implementasi proper authentication dengan Supabase Auth

---
**Note:** Untuk production deployment, pastikan mengubah demo credentials dan implementasi proper authentication system.
