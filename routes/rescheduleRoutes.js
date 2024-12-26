const express = require('express');
const router = express.Router();
const rescheduleController = require('../controllers/rescheduleController');

router.get('/order/:id_penyewaan', rescheduleController.getOrderDetails);

router.put('/order/:id_penyewaan', rescheduleController.updateTanggalMulai);

module.exports = router;