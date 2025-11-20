# Error States & Empty States Documentation

Semua halaman sudah dikasih error code dan quote kocak ketika tidak ada data! 🎉

## Error States di Setiap Halaman

### 1. **News/Berita Page** 
- **Error Code**: `ERROR_404_NO_ARTICLES_FOUND`
- **Emoji**: 📰
- **Quote**: "Berita seperti admin kami... masih loading di surga! 😇"
- **Kondisi**: Ketika tidak ada artikel yang dipublikasikan

### 2. **Contact Page**
- **Error Code**: `ERROR_503_CONTACT_UNAVAILABLE`
- **Emoji**: 📵
- **Quote**: "Kontak kita sedang bermain petak umpet... sambil minum kopi! ☕"
- **Kondisi**: Ketika tidak ada contact info (jarang terjadi, tapi siap jika data kosong)

### 3. **About Page (Benefits Section)**
- **Error Code**: `ERROR_500_BENEFITS_NOT_LOADED`
- **Emoji**: 🏆
- **Quote**: "Manfaat OSIS sedang berlibur panjang, tunggu kabar baik! 🎉"
- **Kondisi**: Ketika data benefit tidak ter-load dengan baik

### 4. **Admin Dashboard**
- **Error Code**: `ERROR_204_NO_ARTICLES`
- **Emoji**: 📋
- **Quote**: "Artikel seperti motivasi Jumat sore... nggak ada sama sekali! 😅"
- **Kondisi**: Ketika belum ada artikel di database
- **Bonus**: Ada tombol "Buat Artikel Pertama" yang langsung buka form

## Design Pattern

Semua error states menggunakan design yang consistent:

```
┌─────────────────────────────────────┐
│   Emoji besar (4xl)                 │
├─────────────────────────────────────┤
│   ERROR_CODE_NAME (Terminal style)  │
├─────────────────────────────────────┤
│   Judul yang Clear                  │
├─────────────────────────────────────┤
│   Quote Kocak di Italic             │
└─────────────────────────────────────┘
```

## Styling

- **Background**: Slate-50 dengan border dashed slate-200
- **Error Code**: Font mono, dark background (slate-900), text hijau (green-400) - kayak terminal hackers! 💻
- **Typography**: Bold title, italic quote, consistent spacing
- **Animation**: Smooth fade-in dengan staggered delays

## Component: ErrorState

Ada juga reusable component `ErrorState.tsx` di `src/components/ErrorState.tsx` yang bisa dipakai di tempat lain:

```tsx
import { ErrorState } from './ErrorState';

<ErrorState
  errorCode="ERROR_XXX_EXAMPLE"
  emoji="🎯"
  title="Judul Error"
  quote="Quote lucu di sini"
/>
```

## Testing

Untuk test error states:

1. **News Page**: Hapus semua artikel atau set `published: false` untuk semua
2. **Contact**: Kosongkan array `contactInfo` (lihat di ContactForm.tsx)
3. **About**: Kosongkan array `benefits` (lihat di About.tsx)
4. **Admin**: Masuk ke admin dashboard tanpa artikel - automatic show error state

---

**Catatan**: Quote-quote dibuat funny tapi tetap professional. Jangan lupa kasih appreciation ke tim karena udah buat ini! 😄
