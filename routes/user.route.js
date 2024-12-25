// routes/ulasan.routes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Users } = require('../models');


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