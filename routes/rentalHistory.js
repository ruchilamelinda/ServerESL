const express = require('express');
const {Penyewaan} = require('../models');
const {Properti} = require('../models');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticate');


router.get('/',authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId, "ini", "bang");
        
        // Query to get all rentals with status 'Selesai'
        const rentals = await Penyewaan.findAll({
            where: { 
                id_users:userId, 
                status: "Selesai" }, // Sequelize syntax for where clause
            include: [{
                model: Properti, // Join with the Properti model
                attributes: ['nama_properti', 'pemilik'] // Select specific fields
            }]
        });

        // Format data yang akan dikirim
        const formattedRentals = rentals.map((rental) => ({
            status: rental.status,
            tanggalOrder: rental.tanggalOrder,
            nama_properti: rental.Properti?.nama_properti || "Tidak diketahui",
            pemilik: rental.Properti?.pemilik || "Tidak diketahui",
        }));

        res.json(formattedRentals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
module.exports = router;