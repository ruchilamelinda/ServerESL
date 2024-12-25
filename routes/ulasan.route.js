const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { Ulasan, Users, Penyewaan } = require('../models');

// Konfigurasi multer untuk upload file
const storage = multer.diskStorage({
  destination: './public/uploads/ulasan/',
  filename: (req, file, cb) => {
    cb(null, `ulasan-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Error: Images and Videos Only!'));
  },
});

// Route untuk membuat ulasan
router.post('/', upload.single('media_ulasan'), async (req, res) => {
  try {
    const { id_penyewaan, ulasan, rating } = req.body;

    // Validasi input
    if (!id_penyewaan || !ulasan || !rating) {
      return res.status(400).json({
        status: 'error',
        message: 'id_penyewaan, ulasan, and rating are required',
      });
    }

    // Ambil id_users dari context (contohnya middleware auth)
    const id_users = req.user.id; // Asumsi middleware auth sudah mengisi req.user

    const media_ulasan = req.file ? `/uploads/ulasan/${req.file.filename}` : null;

    const newUlasan = await Ulasan.create({
      id_users,
      id_penyewaan,
      ulasan,
      rating,
      media_ulasan,
      tanggal_input: new Date(),
    });

    res.status(201).json({
      status: 'success',
      data: newUlasan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

// Route untuk mendapatkan ulasan berdasarkan ID penyewaan
router.get('/penyewaan/:id_penyewaan', async (req, res) => {
  try {
    const ulasan = await Ulasan.findAll({
      where: { id_penyewaan: req.params.id_penyewaan },
      include: [
        { model: Users, attributes: ['nama'] },
        { model: Penyewaan },
      ],
    });

    if (ulasan.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No reviews found for this penyewaan',
      });
    }

    res.json({
      status: 'success',
      data: ulasan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

// Route untuk mengupdate ulasan
router.put('/:id', upload.single('media_ulasan'), async (req, res) => {
  try {
    const { ulasan, rating } = req.body;
    const updateData = {
      ulasan,
      rating,
    };

    if (req.file) {
      updateData.media_ulasan = `/uploads/ulasan/${req.file.filename}`;
    }

    const [updated] = await Ulasan.update(updateData, {
      where: { id_ulasan: req.params.id },
    });

    if (updated) {
      const updatedUlasan = await Ulasan.findByPk(req.params.id);
      res.json({
        status: 'success',
        message: 'Review updated successfully',
        data: updatedUlasan,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Review not found',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
