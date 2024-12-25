const express = require('express');
const { Penyewaan } = require('../models'); // Pastikan nama model benar
const { Properti } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        console.log("iyo tu?");

        const status = await Penyewaan.findAll({
            where: { status: "Aktif" }, 
            include: [{
                model: Properti, 
                attributes: ['id_properti', 'nama_properti']
            }]
        });

        // Format data yang dikirimkan
        const formattedStatus = status.map((status) => ({
            id_properti: status.Properti?.id_properti || "Tidak diketahui",
            status: status.status,
            tanggalMulai: status.tanggalMulai,
            tanggalAkhir: status.tanggalAkhir,
            nama_properti: status.Properti?.nama_properti || "Tidak diketahui",
        }));

        res.json(formattedStatus); // Kirim data dalam format JSON
    } catch (error) {
        console.error("Error fetching rental statuses:", error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;
