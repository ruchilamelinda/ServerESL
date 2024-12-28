const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authenticateJWT = require('../middleware/authenticate');
const ulasanController = require('../controllers/ulasanController');

// Rute untuk menambahkan ulasan
router.post('/add/:id_penyewaan', authenticateJWT, upload.single('media_ulasan'), ulasanController.tambahUlasan);

module.exports = router;
