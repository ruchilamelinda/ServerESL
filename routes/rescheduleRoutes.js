const express = require('express');
const router = express.Router();
const rescheduleController = require('../controllers/rescheduleController');

router.get('/order/:idPenyewaan/:idProperti', rescheduleController.getOrderDetails);

router.put('/order/:idPenyewaan', rescheduleController.updateTanggalMulai);

module.exports = router;

