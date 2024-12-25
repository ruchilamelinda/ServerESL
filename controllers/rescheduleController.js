const db = require('../config/db'); 


exports.getOrderDetails = async (req, res) => {
    const { idPenyewaan, idProperti } = req.params;

    try {
        // Query penyewaan
        const penyewaanResult = await db.query(
            'SELECT tanggalMulai, masaSewa FROM penyewaan WHERE id = ?',
            [idPenyewaan]
        );

        // Query properti
        const propertiResult = await db.query(
            'SELECT nama_properti, jenis_properti, hargaSewa FROM properti WHERE id = ?',
            [idProperti]
        );

        if (penyewaanResult.length === 0 || propertiResult.length === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }

        const penyewaan = penyewaanResult[0];
        const properti = propertiResult[0];

        // Hitung total harga sewa
        const totalHarga = properti.hargaSewa * penyewaan.masaSewa;

        res.json({
            tanggalMulai: penyewaan.tanggalMulai,
            masaSewa: penyewaan.masaSewa,
            namaProperti: properti.nama_properti,
            jenisProperti: properti.jenis_properti,
            hargaSewa: totalHarga,
        });
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller untuk memperbarui tanggal mulai
exports.updateTanggalMulai = async (req, res) => {
    const { idPenyewaan } = req.params;
    const { tanggalMulai } = req.body;

    try {
        await db.query(
            'UPDATE penyewaan SET tanggalMulai = ? WHERE id = ?',
            [tanggalMulai, idPenyewaan]
        );

        res.json({ message: 'Tanggal mulai berhasil diperbarui' });
    } catch (error) {
        console.error('Error updating start date:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
