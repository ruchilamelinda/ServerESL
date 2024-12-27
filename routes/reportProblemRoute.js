const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const problemController = require('../controllers/problemController')
const authenticateJWT = require('../middleware/authenticate')


router.post('/add/:id_penyewaan',authenticateJWT, upload.single('file'), problemController.laporMasalah);

module.exports = router;