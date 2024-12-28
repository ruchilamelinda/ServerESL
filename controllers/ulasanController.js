const { Ulasan } = require('../models');
const { Sequelize } = require('sequelize');

exports.tambahUlasan = async (req, res) => {
    const userId = req.user.id;
    const { id_penyewaan } = req.params;
    const { ulasan, rating } = req.body;

    try {
        const generateUlasanId = () => {
            return Number(Date.now().toString().slice(-6)); // ID unik berbasis timestamp
        };

        const ulasanBaru = await Ulasan.create({
            id_ulasan: generateUlasanId(),
            id_users: userId,
            id_penyewaan: id_penyewaan,
            ulasan: ulasan,
            rating: parseInt(rating, 10),
            media_ulasan: req.file ? req.file.filename : null,
            tanggal_input: new Date()
        });

        if (ulasanBaru) {
            console.log('Berhasil menambahkan ulasan');
            res.json({
                message: 'Ulasan berhasil ditambahkan',
                data: ulasanBaru
            });
        }
    } catch (error) {
        console.error(error.message);

        // Hapus file jika terjadi error setelah upload
        if (req.file) {
            const fs = require('fs');
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Gagal menghapus file:', err.message);
            });
        }

        res.status(500).json({
            message: 'Terjadi kesalahan server',
            error: error.message
        });
    }
};
