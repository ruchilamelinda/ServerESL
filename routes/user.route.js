// routes/ulasan.routes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Users } = require('../models');
const authenticateJWT = require('../middleware/authenticate');


router.get('/', authenticateJWT, async (req, res) => {
  try {
      const userId = req.user.id; // Ambil ID pengguna dari token JWT
      console.log(userId, "Fetching user profile");

      // Cari pengguna berdasarkan ID
      const user = await Users.findOne({
          where: { id: userId },
          attributes: ['username', 'nama'] // Kolom yang ingin diambil
      });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Format data profil pengguna
      const formattedProfile = {
          username: user.username || "Tidak diketahui",
          nama: user.nama || "Tidak diketahui"
      };

      res.json(formattedProfile);

  } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });
  
  // GET: Ambil data profil
  router.get('/:id', async (req, res) => {
    try {
      const user = await Users.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });
  
  // PUT: Perbarui profil
  router.put('/:id', upload.single('foto_profil'), async (req, res) => {
    try {
      const user = await Users.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const { nama, no_Hp, email, username } = req.body;
      if (nama) user.nama = nama;
      if (no_Hp) user.no_Hp = no_Hp;
      if (email) user.email = email;
      if (username) user.username = username;
      if (req.file) user.foto_profil = `/uploads/${req.file.filename}`;
  
      await user.save();
      res.json({ success: true, message: 'Profile updated successfully', user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });
  module.exports = router;