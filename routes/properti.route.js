const express = require('express');
const router = express.Router();
const { Properti } = require('../models');


// Get all properti
router.get('/', async (req, res) => {
  try {
    const propertiList = await Properti.findAll();
    res.json({ 
      success: true,
      message: 'Data properti berhasil diambil',
      data: propertiList 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Terjadi kesalahan pada server' 
    });
  }
});

// Get detail properti by ID
router.get('/:id', async (req, res) => {
  try {
    const properti = await Properti.findByPk(req.params.id);
    if (!properti) {
      return res.status(404).json({ message: 'Properti tidak ditemukan' });
    }

     // Tambahkan URL lengkap ke foto_properti
     const formattedProperti = {
      ...properti.toJSON(),
      foto_properti: properti.foto_properti 
        ? `${req.protocol}://${req.get('host')}/public/${properti.foto_properti}`
        : null // Jika tidak ada foto_properti
    };

    res.json({ 
      success: true,
      message: 'Data properti berhasil diambil',
      data: formattedProperti
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// POST: Tambahkan properti baru
router.post('/', async (req, res) => {
    try {
      const { nama_properti, jenis_properti, pemilik, deskripsi, hargaSewa, status_properti, lokasi, foto_properti, latitude, longitude } = req.body;
  
      // Validasi input
      if (!nama_properti || !lokasi || !hargaSewa || !latitude || !longitude || !pemilik) {
        console.warn('⚠️ Validasi gagal: Semua field harus diisi');
        return res.status(400).json({ message: 'Semua field harus diisi' });
      }
  
      // Simpan ke database
      const propertiBaru = await Properti.create({ nama_properti, jenis_properti, pemilik, deskripsi, hargaSewa, status_properti, lokasi, foto_properti, latitude, longitude });
      console.log('✅ Properti berhasil ditambahkan:', propertiBaru);
      res.status(201).json({ 
        success: true,
        message: 'Properti berhasil ditambahkan', 
        data: propertiBaru });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  });
  

module.exports = router;
