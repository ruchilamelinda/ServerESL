const express = require('express');
const { Penyewaan } = require('../models'); // Pastikan nama model benar
const { Properti } = require('../models');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticate')

router.get('/',authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("iyo tu?", userId);

        const status = await Penyewaan.findAll({
            where: { id_users:userId,
                status: "Aktif" }, 
            include: [{
                model: Properti, 
                attributes: ['id_properti', 'nama_properti']
            }]
        });

        const formattedStatus = status.map((status) => ({
            id_properti: status.Properti?.id_properti || "Tidak diketahui",
            status: status.status,
            id_penyewaan: status.id_penyewaan,
            tanggalMulai: status.tanggalMulai,
            tanggalAkhir: status.tanggalAkhir,
            nama_properti: status.Properti?.nama_properti || "Tidak diketahui",
        }));

        res.json(formattedStatus);
    } catch (error) {
        console.error("Error fetching rental statuses:", error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;