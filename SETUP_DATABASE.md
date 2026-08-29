# Setup Database Supabase

## Langkah-langkah Setup Database:

### 1. Login ke Supabase Dashboard
- Buka https://app.supabase.com
- Login dengan akun Anda
- Pilih project Anda

### 2. Jalankan Migration SQL
- Klik menu **SQL Editor** di sidebar kiri
- Klik tombol **New query**
- Copy semua isi file `supabase/migrations/001_initial_schema.sql`
- Paste ke SQL Editor
- Klik tombol **Run** atau tekan `Ctrl+Enter`

### 3. Verifikasi Tables
Setelah migration berhasil, verifikasi bahwa tables berikut sudah dibuat:
- ✓ couples
- ✓ events
- ✓ rsvps
- ✓ wishes
- ✓ galleries
- ✓ settings
- ✓ gift_recommendations
- ✓ gift_purchases

Klik menu **Table Editor** untuk melihat semua tables.

### 4. Cek Data Seed
Migration akan otomatis mengisi data default:
- 1 couple (Sepri & Fia)
- 2 events (Akad Nikah & Resepsi)
- 1 settings
- 2 gift recommendations (Mirror & Bedcover)

### 5. Test API Endpoints
Setelah database setup, test endpoint berikut di browser:

- GET http://localhost:3000/api/wishes - Ambil semua wishes
- GET http://localhost:3000/api/rsvps - Ambil semua RSVPs
- GET http://localhost:3000/api/gifts - Ambil semua gift recommendations

### 6. Test Form Submissions
Buka halaman invitation dan test:
- Form Wedding Wishes - Submit ucapan
- Form Konfirmasi Kehadiran - Submit RSVP
- Lihat data masuk di Supabase Table Editor

## API Endpoints yang Tersedia:

### Wishes
- `GET /api/wishes` - Get all wishes
- `POST /api/wishes` - Create new wish
  ```json
  {
    "guest_name": "John Doe",
    "message": "Selamat menempuh hidup baru!"
  }
  ```

### RSVPs
- `GET /api/rsvps` - Get all RSVPs
- `POST /api/rsvps` - Create new RSVP
  ```json
  {
    "guest_name": "John Doe",
    "attendance_status": "hadir",
    "total_guest": 2
  }
  ```

### Gift Recommendations
- `GET /api/gifts` - Get all gift recommendations
- `POST /api/gifts/purchase` - Submit gift purchase
  ```json
  {
    "gift_id": "uuid-here",
    "buyer_name": "John Doe",
    "whatsapp_number": "081234567890",
    "email": "john@example.com",
    "quantity": 1,
    "current_total_bought": 0
  }
  ```

## Troubleshooting

### Error: relation does not exist
- Migration belum dijalankan
- Jalankan ulang SQL migration di SQL Editor

### Error: permission denied
- RLS policies belum dibuat
- Check apakah semua policies sudah ter-create di migration

### Data tidak muncul
- Check network tab di browser DevTools
- Verifikasi API endpoint mengembalikan data
- Check Supabase logs di Dashboard

## Environment Variables
Pastikan `.env.local` sudah berisi:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
