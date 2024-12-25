Berikut adalah README untuk tata cara melakukan **pull** dan **push** dari GitHub ke Android Studio menggunakan repository [ESL](https://github.com/VioniWijaya/ESL).

---

# Cara Pull dan Push dari GitHub ke Android Studio

Dokumentasi ini berisi langkah-langkah untuk melakukan **pull** (mengambil perubahan terbaru) dan **push** (mengirim perubahan) dari dan ke repository GitHub di Android Studio.

## Prasyarat
- **Android Studio** sudah terinstall
- **Akun GitHub** sudah terhubung dengan Android Studio
- **Git** sudah terinstall di sistem
- **Access Permissions** untuk repository [ESL](https://github.com/VioniWijaya/ESL) (pastikan Anda memiliki akses push ke repository ini)

## Clone Repository ESL (Langkah Awal)
Jika Anda belum meng-clone repository ini, ikuti langkah berikut:
1. **Buka Android Studio** dan pilih **Get from Version Control**.
2. Masukkan URL repository:
   ```
   https://github.com/VioniWijaya/ESL.git
   ```
3. Tentukan lokasi direktori proyek di perangkat Anda, lalu klik **Clone**.
4. Tunggu hingga Android Studio selesai meng-clone proyek dan mengunduh dependensi yang diperlukan.

## Langkah-langkah Pull dari GitHub

**Pull** digunakan untuk mengambil perubahan terbaru dari repository GitHub dan menyinkronkan dengan proyek lokal Anda.

1. **Buka Proyek di Android Studio**:
   - Pastikan Anda sudah membuka proyek **ESL** di Android Studio.

2. **Klik VCS (Version Control System)**:
   - Di menu atas, pilih **VCS** > **Git** > **Pull**.
   - Android Studio akan menampilkan jendela konfirmasi untuk **pull**.

3. **Pilih Branch yang Akan di Pull**:
   - Pilih branch yang akan di-pull (secara default adalah `main` atau `master`).
   - Klik **Pull** untuk mengambil perubahan terbaru dari GitHub.

4. **Selesaikan Konflik (Jika Ada)**:
   - Jika ada konflik pada file yang Anda edit, Android Studio akan meminta Anda untuk menyelesaikan konflik tersebut.
   - Ikuti instruksi di Android Studio untuk mengatasi konflik, kemudian lakukan **commit** ulang jika diperlukan.

## Langkah-langkah Push ke GitHub

**Push** digunakan untuk mengirim perubahan dari proyek lokal Anda ke repository GitHub.

1. **Commit Perubahan**:
   - Sebelum melakukan **push**, pastikan semua perubahan Anda sudah di-commit.
   - Pilih **VCS** > **Commit** atau klik ikon **Commit** di toolbar.
   - Pilih file yang ingin Anda commit, tambahkan pesan commit yang mendeskripsikan perubahan Anda, lalu klik **Commit**.
   - Jika diminta untuk **commit and push**, pilih **Commit and Push**.

2. **Push Perubahan ke GitHub**:
   - Jika belum melakukan push, buka menu **VCS** > **Git** > **Push**.
   - Android Studio akan menampilkan jendela konfirmasi untuk **push**.
   - Periksa kembali branch dan perubahan yang akan dikirim, lalu klik **Push**.

3. **Konfirmasi Push**:
   - Android Studio akan mengirim perubahan Anda ke GitHub.
   - Setelah push berhasil, Anda bisa memverifikasi perubahan di repository GitHub dengan membuka [repository ESL](https://github.com/VioniWijaya/ESL).

## Troubleshooting
- Jika Anda mengalami masalah autentikasi, periksa apakah akun GitHub sudah terhubung di Android Studio (`File` > `Settings` > `Version Control` > `GitHub`).
- Jika ada konflik saat melakukan **push** atau **pull**, ikuti instruksi resolusi konflik di Android Studio atau gunakan Git di command line untuk penyelesaian lebih lanjut.

## Tips
- **Lakukan Pull secara Berkala**: Sebelum melakukan **push**, selalu lakukan **pull** untuk memastikan Anda bekerja dengan versi terbaru dari repository.
- **Gunakan Branch untuk Pengembangan Baru**: Jika Anda mengerjakan fitur baru, sebaiknya buat branch baru untuk menghindari konflik di branch utama.

--- 

README ini memberikan langkah-langkah dasar untuk sinkronisasi dengan GitHub dari Android Studio.
