# 📘 Dokumentasi Aplikasi Booking Restoran Multi-Vendor

## 🧭 Ringkasan Sistem

Aplikasi ini adalah sistem reservasi restoran online yang mendukung **multi-vendor**. Setiap vendor (restoran) memiliki jadwal operasional, meja, dan reservasi masing-masing. Superadmin mengelola vendor dan pengguna.

---

## 👥 Aktor dalam Sistem

### 1. Superadmin
- Mengelola semua vendor.
- Memverifikasi vendor baru.
- Mengelola pengguna sistem.

### 2. Vendor (Restoran)
- Mengelola informasi restoran.
- Menambahkan meja, jadwal, dan menerima reservasi.
- Bisa memiliki beberapa pengguna dengan peran berbeda (owner, manager, staff).

### 3. Customer
- Melakukan pemesanan meja berdasarkan ketersediaan.

---

## 🗃️ Struktur Tabel Utama

### `users`
- Menyimpan data pengguna sistem.
- Role: `superadmin`, `vendor`, `staff`
- Satu user bisa terkait dengan banyak vendor.

### `vendors`
- Menyimpan informasi restoran.
- Tidak lagi menyimpan `owner_id` langsung.
- Informasi termasuk nama, deskripsi, logo, kontak, dan status verifikasi.

### `vendor_users`
- Tabel penghubung many-to-many antara `users` dan `vendors`.
- Menyimpan peran user dalam vendor (`owner`, `manager`, `staff`).

### `vendor_schedules`
- Menyimpan jam operasional tiap hari untuk masing-masing vendor.
- Kolom: `day_of_week`, `open_time`, `close_time`, `is_closed`.

### `tables`
- Menyimpan daftar meja milik masing-masing vendor.
- Kolom: `table_number`, `capacity`, `vendor_id`.

### `guests`
- Menyimpan data pelanggan yang melakukan reservasi.

### `bookings`
- Menyimpan reservasi yang dilakukan pelanggan.
- Kolom penting: `booking_date`, `time`, `num_guests`, `status`.

### `booking_tables`
- Tabel many-to-many antara `bookings` dan `tables`.

### `mealtimes`
- Menyimpan waktu makan: `breakfast`, `lunch`, `dinner`.

### `booking_mealtimes`
- Relasi many-to-many antara booking dan mealtime.

---

## 🔐 Autentikasi & Autorisasi

- Sistem menggunakan JWT.
- Payload token berisi `user_id`, `role`, `vendor_ids`, dan `exp`.
- Middleware memverifikasi dan membatasi akses berdasarkan role.

---

## 📋 Status & Role

### `users.role`
- `superadmin`
- `vendor`
- `staff`

### `vendors.status`
- `pending`
- `verified`
- `rejected`

### `bookings.booking_status`
- `pending`
- `confirmed`
- `seated`
- `cancelled`
- `finished`

### `bookings.reply_status`
- `pending`
- `replied`
- `no_reply`

---

## 🔄 Alur Booking

1. Customer memilih vendor, tanggal, jam, dan jumlah tamu.
2. Sistem mengecek jadwal operasional dan ketersediaan meja.
3. Jika tersedia, booking dikonfirmasi dan disimpan.
4. Jika tidak, sistem menolak atau memberi saran waktu lain.

---

## ⚙️ Logika Penting

- Validasi kapasitas meja secara dinamis.
- Booking memiliki durasi (default 1,5–2 jam).
- Jadwal vendor berdasarkan hari.
- Booking ditolak jika di luar jam operasional atau meja penuh.

---

## 📦 Ekstensi Mendatang

- Notifikasi WhatsApp otomatis.
- Dashboard statistik vendor.
- Manajemen menu per restoran.