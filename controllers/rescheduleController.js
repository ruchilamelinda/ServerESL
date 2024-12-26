const db = require('../config/config');
const express = require('express');
const {
    Sequelize
} = require('sequelize');
const {
    Penyewaan
} = require('../models'); // Pastikan nama model benar
const {
    Properti
} = require('../models');

//controller reschedule
exports.getOrderDetails = async (req, res) => {
    const {
        id_penyewaan
    } = req.params;

    try {
        // Query penyewaan
        const penyewaanResult = await Penyewaan.findOne({
            where: {
                id_penyewaan: id_penyewaan
            },
            include: [{
                model: Properti,
                attributes: ['nama_properti', 'jenis_properti', 'lokasi']
            }]
        });

        // Query properti


        if (!penyewaanResult) {
            return res.status(404).json({
                message: 'Data tidak ditemukan'
            });
        }

        // const penyewaan = penyewaanResult[0];

        res.json({
            tanggalMulai: penyewaanResult.tanggalMulai,
            tanggalAkhir: penyewaanResult.tanggalAkhir,
            masaSewa: penyewaanResult.masaSewa,
            namaProperti: penyewaanResult.Properti.nama_properti,
            jenisProperti: penyewaanResult.Properti.jenis_properti,
            lokasi: penyewaanResult.Properti.lokasi,
        });
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

// Controller untuk memperbarui tanggal mulai
exports.updateTanggalMulai = async (req, res) => {
    const {
        tanggalMulai,
        masaSewa
    } = req.body;

    try {
        const id_penyewaan = req.params.id_penyewaan;
        const id_penyewaanInt = parseInt(req.params.id_penyewaan, 10);

        let id_penyewaanParams = req.params.id_penyewaan;

        // Jika string mengandung "id_penyewaan = ", hapus bagian tersebut dan ambil hanya angkanya
        id_penyewaanParams = id_penyewaanParams.replace("id_penyewaan = ", "");

        // Ubah menjadi integer
        id_penyewaanParams = parseInt(id_penyewaanParams, 10);

        console.log("idpenyewaannya yangdihapus", id_penyewaanParams);



        console.log("yang didapat dari android", tanggalMulai, masaSewa);
        console.log("idpenyewaannya yang parseInt", id_penyewaanInt);
        console.log("idpenyewaannya yang langsung", id_penyewaan);

        // Pastikan format tanggal adalah YYYY-MM-DD
        const tanggalMulaiDate = new Date(tanggalMulai); // Gunakan format YYYY-MM-DD

        if (isNaN(tanggalMulaiDate.getTime())) {
            return res.status(400).json({
                message: 'Format tanggal tidak valid'
            });
        }

        // Tambahkan masaSewa ke tanggalMulai untuk mendapatkan tanggalAkhir
        const tanggalAkhir = new Date(tanggalMulaiDate);
        tanggalAkhir.setDate(tanggalMulaiDate.getDate() + parseInt(masaSewa, 10)); // Tambah masaSewa (jumlah hari)
        console.log(tanggalAkhir);

        // Update penyewaan di database
        const [hasilReschedule] = await Penyewaan.update({
            tanggalMulai: tanggalMulaiDate,
            masaSewa: masaSewa,
            tanggalAkhir: tanggalAkhir
        }, {
            where: {
                id_penyewaan: id_penyewaan // Gunakan id_penyewaan dari params
            }
        });

        if (hasilReschedule > 0) {
            console.log("Berhasil Direschedule");
            res.json({
                message: 'Berhasil Direschedule'
            });
        } else {
            console.log("Gagal Direschedule, id_penyewaan tidak ditemukan atau tidak ada perubahan");
            res.status(404).json({
                message: 'Data tidak ditemukan atau tidak ada perubahan'
            });
        }

    } catch (error) {
        console.error('Error updating start date:', error);
        res.status(500).json({
            message: 'Server error'
        });
    }
};