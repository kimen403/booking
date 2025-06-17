
# 🗃️ Struktur Database Aplikasi Booking Restoran Multi-Vendor

---

## 🔹 1. users
Menyimpan data pengguna sistem.

| Kolom       | Tipe         | Keterangan                        |
|-------------|--------------|-----------------------------------|
| id          | VARCHAR(50)  | Primary key                       |
| name        | VARCHAR(50)  | Nama lengkap                      |
| email       | VARCHAR(50)  | Unik, digunakan untuk login       |
| password    | TEXT         | Hash password                     |
| role        | VARCHAR(20)  | 'superadmin', 'vendor', 'staff'  |
| status      | VARCHAR(20)  | 'active', 'suspended', 'pending' |
| created_at  | TIMESTAMP    | Timestamp dibuat                  |
| updated_at  | TIMESTAMP    | Timestamp diupdate                |

---

## 🔹 2. vendors
Informasi setiap restoran/vendor.

| Kolom              | Tipe          | Keterangan                                |
|--------------------|---------------|-------------------------------------------|
| id                 | VARCHAR(50)   | Primary key                               |
| vendor_name        | VARCHAR(255)  | Nama restoran, unik                       |
| vendor_description | TEXT          | Deskripsi restoran                        |
| vendor_logo_url    | TEXT          | URL logo                                  |
| contact_number     | VARCHAR(25)   | Nomor telepon                             |
| has_whatsapp       | BOOLEAN       | True jika mendukung WhatsApp              |
| status             | VARCHAR(20)   | 'pending', 'verified', 'rejected'         |
| address            | JSONB         | Alamat dalam format JSON                  |
| verification_notes | TEXT          | Catatan verifikasi                        |
| verified_by        | VARCHAR(50)   | FK ke users.id                            |
| verification_at    | TIMESTAMP     | Tanggal diverifikasi                      |
| created_at         | TIMESTAMP     | Timestamp dibuat                          |
| updated_at         | TIMESTAMP     | Timestamp diupdate                        |

---

## 🔹 3. vendor_users
Relasi many-to-many antara users dan vendors.

| Kolom           | Tipe         | Keterangan                              |
|------------------|--------------|------------------------------------------|
| id               | SERIAL       | Primary key                             |
| vendor_id        | VARCHAR(50)  | FK ke vendors(id)                       |
| user_id          | VARCHAR(50)  | FK ke users(id)                         |
| role_in_vendor   | VARCHAR(20)  | 'owner', 'manager', 'staff'             |
| created_at       | TIMESTAMP    | Timestamp                               |

---

## 🔹 4. vendor_schedules
Jam operasional restoran berdasarkan hari.

| Kolom       | Tipe         | Keterangan                         |
|-------------|--------------|------------------------------------|
| id          | SERIAL       | Primary key                        |
| vendor_id   | VARCHAR(50)  | FK ke vendors(id)                  |
| day_of_week | VARCHAR(10)  | 'monday', 'tuesday', ..., 'sunday'|
| open_time   | TIME         | Jam buka                           |
| close_time  | TIME         | Jam tutup                          |
| is_closed   | BOOLEAN      | Jika tutup di hari itu             |

---

## 🔹 5. tables
Meja yang dimiliki oleh vendor.

| Kolom         | Tipe         | Keterangan                      |
|---------------|--------------|----------------------------------|
| table_id      | INT          | Primary key                     |
| vendor_id     | VARCHAR(50)  | FK ke vendors(id)               |
| table_number  | INT          | Nomor meja                      |
| capacity      | INT          | Kapasitas meja                  |

---

## 🔹 6. guests
Data customer yang melakukan reservasi.

| Kolom     | Tipe         | Keterangan                     |
|-----------|--------------|--------------------------------|
| guest_id  | INT          | Primary key                   |
| name      | VARCHAR(100) | Nama tamu                     |
| phone     | VARCHAR(20)  | Nomor HP (opsional)           |
| email     | VARCHAR(100) | Email (opsional)              |

---

## 🔹 7. bookings
Data reservasi pelanggan.

| Kolom           | Tipe         | Keterangan                              |
|------------------|--------------|------------------------------------------|
| booking_id       | INT          | Primary key                              |
| vendor_id        | VARCHAR(50)  | FK ke vendors(id)                        |
| guest_id         | INT          | FK ke guests(guest_id)                   |
| booking_date     | DATE         | Tanggal booking                          |
| time             | TIME         | Jam booking                              |
| num_guests       | INT          | Jumlah tamu                              |
| notes            | TEXT         | Catatan tambahan                         |
| reply_status     | VARCHAR(20)  | 'pending', 'replied', 'no_reply'         |
| booking_status   | VARCHAR(20)  | 'pending', 'confirmed', etc.             |
| created_at       | TIMESTAMP    | Timestamp dibuat                         |

---

## 🔹 8. booking_tables
Relasi bookings ke meja yang digunakan.

| Kolom       | Tipe         | Keterangan                     |
|-------------|--------------|--------------------------------|
| booking_id  | INT          | FK ke bookings                 |
| table_id    | INT          | FK ke tables                   |

---

## 🔹 9. mealtimes
Jenis waktu makan.

| Kolom     | Tipe         | Keterangan                     |
|-----------|--------------|--------------------------------|
| meal_id   | INT          | Primary key                   |
| name      | VARCHAR(20)  | 'breakfast', 'lunch', etc.    |

---

## 🔹 10. booking_mealtimes
Relasi booking ke jenis mealtime.

| Kolom       | Tipe         | Keterangan                     |
|-------------|--------------|--------------------------------|
| booking_id  | INT          | FK ke bookings                 |
| meal_id     | INT          | FK ke mealtimes                |
