// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/config');
const db = require('./models');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*', // Pastikan ini diubah jika ingin mengatur domain tertentu
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
// app.use(express.json());
app.use((req, res, next) => {
  res.setTimeout(30000, () => { // 30 detik
    console.log('Request timeout');
    res.status(504).send('Request Timeout');
  });
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import Routes (contoh)
const authRoutes = require('./routes/auth.route');
app.use('/api/auth', authRoutes);

//api history
const rentalHistoryRoutes = require('./routes/rentalHistory');
app.use('/api/rental', rentalHistoryRoutes);

const rentalStatusRoutes = require('./routes/rentalStatus');
app.use('/api/status', rentalStatusRoutes);

const rescheduleRoutes = require('./routes/rescheduleRoutes');
app.use('/api', rescheduleRoutes);

const propertiRoutes = require('./routes/properti.route');
app.use('/api/properti', propertiRoutes);

const penyewaanRoutes = require('./routes/penyewaan.route');
app.use('/api/penyewaan', penyewaanRoutes);

const ulasanRoutes = require('./routes/ulasan.route');
app.use('/api/ulasan', ulasanRoutes);

const profileUser = require('./routes/user.route');
app.use('/api/profile', profileUser);

const problem = require('./routes/reportProblemRoute');
app.use('/api/problem', problem);

const favorite = require('./routes/rentalFavorite');
app.use('/api/favorite', favorite);

// Sinkronisasi Database
sequelize.sync(false)
  .then(() => {
    console.log('Database tersambung');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server berjalan di port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Gagal tersambung ke database:', err);
  });

  