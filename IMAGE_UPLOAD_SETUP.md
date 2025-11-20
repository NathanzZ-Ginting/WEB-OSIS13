# ✨ Image Upload Feature - Complete Setup

## Yang Sudah Dikerjakan 🎉

Saya udah bikin fitur image upload yang lengkap! Sekarang admin bisa upload gambar langsung dari dashboard, tanpa perlu paste URL.

---

## 📝 File yang Berubah

### 1. **src/lib/supabase.ts** (+ Image Upload Functions)
```typescript
// NEW: imageAPI object dengan 2 function
imageAPI.uploadImage(file) → Upload ke Supabase Storage, return public URL
imageAPI.deleteImage(imageUrl) → Delete gambar dari storage
```

### 2. **src/components/AdminDashboard.tsx** (+ Image Upload UI)
- Tambah state: `uploading`, `imagePreview`
- Tambah function: `handleImageUpload()`
- Replace URL input dengan **Drag & Drop zone**
- Tampilkan image preview sebelum save

### 3. **SUPABASE_SETUP.md** (+ Storage Setup SQL)
Tambah section "Step 2B" dengan SQL query untuk setup storage bucket

---

## 🚀 Cara Menggunakan

### Step 1: Run SQL Query di Supabase
Copy SQL dari `SUPABASE_SETUP.md` bagian **Step 2B** ke SQL Editor Supabase, klik Run.

Ini akan:
- ✅ Create storage bucket `article-images`
- ✅ Setup RLS policies untuk public read/write

### Step 2: Upload Gambar di Admin
1. Buka http://localhost:5173/admin
2. Login
3. Klik "Tambah Artikel"
4. Di bagian "Gambar Artikel":
   - Drag & drop file, ATAU
   - Klik untuk browse & pilih file
5. Tunggu upload selesai
6. Klik "Simpan"

Gambar otomatis terupload ke Supabase Storage! 📸

---

## ✨ Features

✅ **Drag & Drop** - Drag gambar ke upload zone
✅ **Live Preview** - Lihat gambar sebelum save
✅ **Remove** - Klik X di corner preview untuk hapus
✅ **File Validation** - Max 10MB, format PNG/JPG/WebP
✅ **Auto Cleanup** - Gambar lama dihapus saat edit
✅ **Fallback** - Convert ke base64 jika Supabase offline
✅ **Loading State** - Show spinner saat upload

---

## 📱 UI Components

### Upload Zone (Normal)
```
┌────────────────────────────────┐
│  📸                            │
│  Pilih atau drag gambar di sini │
│  PNG, JPG, WebP (Max 10MB)    │
└────────────────────────────────┘
```

### Upload Zone (With Preview)
```
┌────────────────────────────────┐
│  ┌──────────────────────────┐  │
│  │   [Preview Image]    X   │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
```

---

## 🔧 Technical Details

### Upload Function
```typescript
const imageUrl = await imageAPI.uploadImage(file)
// Returns: https://xyz.supabase.co/storage/v1/object/public/article-images/...
```

### Storage Bucket
- **Name**: `article-images`
- **Public**: Yes (accessible from frontend)
- **Max file**: 10MB per file
- **Lifetime**: Forever (sampai manual delete)

### RLS Policies
- Public read: Siapa pun bisa lihat gambar
- Public insert: Siapa pun bisa upload
- Public update: Siapa pun bisa update
- Public delete: Siapa pun bisa hapus

---

## 📚 Files Created/Modified

**Created:**
- `IMAGE_UPLOAD_GUIDE.md` - Detailed setup guide

**Modified:**
- `src/lib/supabase.ts` - Tambah imageAPI export
- `src/components/AdminDashboard.tsx` - Tambah upload UI
- `SUPABASE_SETUP.md` - Tambah Step 2B untuk storage

---

## ✅ Checklist

- [ ] Run SQL query dari Step 2B di Supabase
- [ ] Refresh admin dashboard
- [ ] Test upload gambar
- [ ] Cek di halaman berita - gambar sudah visible?
- [ ] Test delete artikel - gambar dihapus dari storage?
- [ ] Test offline - fallback ke base64 bekerja?

---

**Status**: ✅ Ready to use! Cukup run SQL query dan mulai upload gambar dari admin dashboard.
