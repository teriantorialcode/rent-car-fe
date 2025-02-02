## Frontend Setup (Vue 3)

### 1. **Clone Repository**

- Clone repository frontend ke dalam lokal Anda:
  ```bash
  git clone https://github.com/teriantorialcode/rent-car-frontend.git
  cd rent-car-frontend
  ```

### 2. **Install Dependencies**

- Pastikan Anda sudah menginstal **Node.js**. Anda bisa mengunduhnya [di sini](https://nodejs.org/).
- Jalankan perintah berikut untuk menginstal semua dependencies:
  ```bash
  npm install
  ```

### 3. **Configure API URL**

- Pastikan API URL pada frontend sudah disesuaikan dengan URL backend Anda.
- Buka file `src/api/api.js` dan pastikan URL API menggunakan `https://localhost:7127`:

  ```javascript
  import axios from 'axios'

  const apiClient = axios.create({
    baseURL: 'https://localhost:7127/api',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  export default apiClient
  ```

### 4. **Run Frontend Application**

- Jalankan aplikasi frontend menggunakan perintah berikut:
  ```bash
  npm run serve
  ```
- Aplikasi frontend akan berjalan di `http://localhost:8080`.

---

## Penggunaan Aplikasi

### 1. **Booking Mobil**

- Akses halaman **Rent A Car!** di `http://localhost:8080/booking`.
- Isi form dengan data yang diperlukan:
  - Nama Anda
  - Email dan Nomor Telepon
  - Pilih mobil dan waktu yang diinginkan
- Klik **Submit Booking** untuk melakukan booking.

### 2. **Melihat Daftar Booking**

- Akses halaman **Rent car List** untuk melihat daftar booking mobil yang sudah ada di `http://localhost:8080/rent-car-list`.

---

## Troubleshooting

- **Masalah Koneksi Database**: Pastikan PostgreSQL berjalan dan string koneksi di `appsettings.json` sudah benar.
- **Masalah CORS di API**: Jika frontend tidak bisa mengakses API, pastikan API backend mengizinkan CORS. Anda bisa menambahkan middleware CORS di `Startup.cs` atau `Program.cs` seperti berikut:
  ```csharp
  services.AddCors(options =>
  {
      options.AddPolicy("AllowAll",
          builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
  });
  ```
