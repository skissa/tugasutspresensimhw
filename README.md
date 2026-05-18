# Sistem Manajemen Data Mahasiswa Berbasis Web

Aplikasi web sederhana untuk mengelola data mahasiswa secara dinamis. Proyek ini dibangun sepenuhnya menggunakan teknologi web dasar tanpa bergantung pada *framework* atau *library* pihak ketiga (Pure/Vanilla HTML, CSS, dan JavaScript).

## 🚀 Fitur Utama

1. **Autentikasi & Login Sederhana**: Proteksi halaman awal sebelum masuk ke dashboard utama (Kredensial: Username `admin` / Password `admin123`).
2. **Manajemen CRUD Lengkap**:
   - **Create**: Menambahkan data mahasiswa baru disertai validasi anti-duplikasi NIM.
   - **Read**: Menampilkan seluruh data mahasiswa secara terstruktur di dalam tabel.
   - **Update**: Mengubah data mahasiswa yang sudah ada berdasarkan baris yang dipilih.
   - **Delete**: Menghapus data mahasiswa dari sistem dengan konfirmasi keamanan.
3. **Pencarian Dinamis**: Fitur pencarian *real-time* berdasarkan NIM atau Nama Mahasiswa dilengkapi dengan pencahayaan teks (*text highlighting*).
4. **Pagination**: Pembatasan jumlah baris data per halaman (Limit 5 / 10 data) untuk menjaga kerapian antarmuka.
5. **Kustomisasi Tema (Dark / Light Mode)**: Pengalihan tema tampilan yang responsif dan nyaman di mata.
6. **Ekspor Data**: Fitur tambahan untuk mengunduh seluruh data mahasiswa yang tersimpan ke dalam format file `.csv`.

## 💾 Arsitektur Penyimpanan Data

Proyek ini berjalan murni di sisi klien (*client-side*) menggunakan fitur bawaan browser:
* **Local Storage**: Digunakan untuk menyimpan array objek data mahasiswa secara permanen dan persisten meskipun halaman di-refresh atau browser ditutup.
* **Session Storage**: Digunakan untuk mengelola status sesi login (`isLoggedIn`). Sesi otomatis terhapus saat pengguna menutup tab browser demi alasan keamanan.

## 📁 Struktur Berkas

```text
├── index.html   # Struktur antarmuka (UI) dan dekorasi gaya (CSS)
└── script.js    # Logika fungsionalitas, manipulasi DOM, dan penyimpanan (JavaScript)
