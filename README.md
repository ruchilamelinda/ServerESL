# Server ESL

## Configurasi Project

1. **Clone repo**

   ```bash
   git clone https://github.com/ruchilamelinda/serverESL
   ```

2. **Cd ke folder project**

   ```bash
   cd serverESL
   ```

3. **Install semua depedensi yang diperlukan**

   ```bash
   npm install
   ```

4. **Hidupkan MySQL XAMPP dan buat database & setting koneksi db pada config/config.json**

   ```bash
   "development": {
    "username": "root",
    "password": null,
    "database": "esl",
    "host": "localhost",
    "dialect": "mysql"
   }
   ```

5. **Lakukan migrasi tabel dari express ke database**

   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Jalankan Express dan tailwind di 2 terminal berbeda dengan perintah**

    ```bash
   npm run tail
   npm run dev
   ```

7. **Untuk push perubahan silahkan buatlah branch baru terlebih dahulu**

   ```bash
   git branch (namaBranch)//buat branch baru
   git checkout namaBranch
   git add .
   git commit -m "pesan"
   git push -u origin namaBranch
   ```
