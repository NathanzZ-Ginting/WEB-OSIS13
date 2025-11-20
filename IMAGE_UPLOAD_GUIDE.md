# Image Upload Setup Guide

Fitur image upload sudah integrated dengan Supabase Storage! 📸

## Setup Steps

### Step 1: Run SQL Query untuk Storage Setup

Buka Supabase Dashboard → SQL Editor → New Query → Copy-paste query berikut:

```sql
-- ========================================
-- SETUP STORAGE BUCKET & RLS POLICIES
-- ========================================

-- Enable Storage extension if needed
CREATE EXTENSION IF NOT EXISTS "storage";

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

Klik **Run** dan tunggu selesai ✅

### Step 2: Test di Admin Dashboard

1. Buka http://localhost:5173/admin
2. Login dengan credentials yang sudah ada
3. Klik "Tambah Artikel"
4. Di bagian "Gambar Artikel", pilih atau drag image file
5. Tunggu sampai upload selesai
6. Klik "Simpan" artikel

Gambar akan otomatis terupload ke Supabase Storage dan URL akan tersimpan di database! 🎉

## Fitur

✅ **Drag & Drop Support** - Drag gambar langsung ke upload box
✅ **Image Preview** - Lihat preview sebelum save
✅ **File Size Check** - Max 10MB per file
✅ **Supported Formats** - PNG, JPG, WebP, dll
✅ **Fallback Mode** - Jika Supabase unavailable, convert ke base64 untuk local storage
✅ **Auto Delete** - Gambar lama akan dihapus saat edit artikel

## Code Structure

### imageAPI Functions (di src/lib/supabase.ts)

```typescript
// Upload image ke Supabase Storage
const imageUrl = await imageAPI.uploadImage(file)

// Delete image dari Storage
await imageAPI.deleteImage(imageUrl)
```

### AdminDashboard Component

- State: `uploading`, `imagePreview`
- Function: `handleImageUpload()` - Handle file input dan upload
- UI: Drag-drop zone dengan live preview

## File Limits

- **Max file size**: 10MB
- **Supported formats**: PNG, JPG, WebP, GIF, AVIF
- **Storage bucket**: `article-images`
- **Path pattern**: `{timestamp}_{filename}`

## Error Handling

Jika upload gagal:
1. Check file size < 10MB
2. Cek koneksi internet
3. Pastikan Supabase credentials di .env sudah benar
4. Cek bahwa storage bucket sudah created dan RLS policies enabled

## Backup Images

Semua uploaded images tersimpan di Supabase Storage bucket `article-images`. 
Untuk download/backup:

1. Buka Supabase Dashboard
2. Storage → article-images
3. Download files yang diperlukan

---

**Status**: ✅ Ready to use! Cukup run SQL query dan upload gambar langsung dari admin dashboard.
