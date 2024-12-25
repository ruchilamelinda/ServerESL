const express = require('express');
const {Penyewaan} = require('../models');
const moment = require('moment');
const {Properti} = require('../models');
const router = express.Router();


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

// Endpoint untuk membatalkan penyewaan
router.post('/batal', async (req, res) => {
  try {
    const { id_penyewaan, alasan_batal } = req.body;

    if (!id_penyewaan || !alasan_batal) {
      return res.status(400).json({ message: 'ID penyewaan dan alasan pembatalan harus diisi' });
    }

    // Cari penyewaan berdasarkan ID
    const penyewaan = await Penyewaan.findByPk(id_penyewaan);

    if (!penyewaan) {
      return res.status(404).json({ message: 'Penyewaan tidak ditemukan' });
    }

    if (penyewaan.status !== 'Aktif') {
      return res.status(400).json({ message: 'Penyewaan sudah dibatalkan atau selesai' });
    }

    // Update status penyewaan menjadi "batal" dan simpan alasan pembatalan
    penyewaan.status = 'Dibatalkan';
    penyewaan.alasan_batal = alasan_batal;
    await penyewaan.save();

    res.status(200).json({ 
      success: true,
      message: 'Penyewaan berhasil dibatalkan',
      data: penyewaan 
    });
  } catch (error) {
    res.status(400).json({ message: 'Gagal membatalkan penyewaan', error: error.message });
  }
});

module.exports = router;