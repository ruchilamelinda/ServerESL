const {
    Penyewaan
} = require('../models');
const {
    LaporanMasalah
} = require('../models');
const express = require('express');
const {
    Sequelize
} = require('sequelize');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const fs = require('fs');
const path = require('path');

exports.laporMasalah = async (req, res) => {
    const userId = req.user.id;
    const {
        id_penyewaan
    } = req.params
    const {
        masalah
    } = req.body

    try {
        console.log("sayyyyyyyyyyyyy")
        const generateReportId = () => {
            return Number(Date.now().toString().slice(-6)); // hasil akhirnya tetap integer
        };

        const laporan = await LaporanMasalah.create({
            id_laporan: generateReportId,
            id_users: userId,
            id_penyewaan: id_penyewaan,
            masalah: masalah,
            media: req.file ? req.file.filename : null,
            tanggal_laporan: new Date()
        })
        if (laporan) {
            console.log("Berhasil upload report");

            res.json({
                message: 'Report Problem Berhasil'

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
}