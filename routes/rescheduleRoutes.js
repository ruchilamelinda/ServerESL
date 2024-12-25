const express = require('express');
const router = express.Router();
const rescheduleController = require('../controllers/rescheduleController');

// Endpoint untuk mendapatkan detail penyewaan dan properti
router.get('/order/:idPenyewaan/:idProperti', rescheduleController.getOrderDetails);

// Endpoint untuk memperbarui tanggal mulai
router.put('/order/:idPenyewaan', rescheduleController.updateTanggalMulai);

module.exports = router;
