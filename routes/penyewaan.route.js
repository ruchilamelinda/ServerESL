const express = require('express');
const {Penyewaan} = require('../models');
const moment = require('moment');
const {Properti} = require('../models');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticate');



  router.post('/', async (req, res) => {
    try {
      const { id_users, id_properti, tanggalMulai, tanggalAkhir, status } = req.body;
      const startDate = moment(tanggalMulai);
      const endDate = moment(tanggalAkhir);
      const masaSewa = endDate.diff(startDate, 'days'); // Hitung selisih hari

      if (!id_users || !id_properti || !tanggalMulai || !tanggalAkhir ) {
        console.warn('⚠️ Validasi gagal: Semua field harus diisi');
        return res.status(400).json({ message: 'Semua field harus diisi' });
      }
      const penyewaan = await Penyewaan.create({
          id_users,
          id_properti,
          tanggalMulai: startDate.format('YYYY-MM-DD HH:mm'),
          tanggalAkhir: endDate.format('YYYY-MM-DD HH:mm'),
          tanggalOrder: moment().format('YYYY-MM-DD HH:mm'),
          masaSewa, // Simpan masa sewa sebagai angka (jumlah hari)
          status
      });
      res.status(201).json({ 
        success: true,
        message: 'Penyewaan berhasil dibuat', data: penyewaan });
    } catch (error) {
      res.status(400).json({ message: 'Gagal membuat penyewaan', error: error.message });
    }
  });

// Endpoint untuk pembatalan penyewaan
router.post('/:id_penyewaan/cancel', authenticateJWT, async (req, res) => {
  try {
      const { id_penyewaan } = req.params;
      const { alasan_batal } = req.body;
      const userId = req.user.id;

      // Cek apakah penyewaan ada dan milik user yang bersangkutan
      const penyewaan = await Penyewaan.findOne({
          where: {
              id_penyewaan: id_penyewaan,
              id_users: userId,
              status: 'Aktif' // Pastikan status masih aktif
          }
      });

      if (!penyewaan) {
          return res.status(404).json({
              success: false,
              message: 'Penyewaan tidak ditemukan atau tidak dapat dibatalkan'
          });
      }

      // Update status penyewaan
      await penyewaan.update({
        status: 'Dibatalkan', // Pastikan status sesuai ENUM
        alasan_batal: alasan_batal, // Gunakan nama kolom yang benar
    });
    

      res.json({
          success: true,
          message: 'Penyewaan berhasil dibatalkan',
          data: penyewaan
      });

  } catch (error) {
      console.error('Error dalam pembatalan:', error);
      res.status(500).json({
          success: false,
          message: 'Terjadi kesalahan saat membatalkan penyewaan',
          error: error.message
      });
  }
});


module.exports = router;