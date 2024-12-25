const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');


const User = require('../models').Users;

// Register User


// Login User
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Log data yang diterima dari frontend
        console.log("Data diterima:", req.body);

        // Validasi input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username dan password harus diisi' });
        }

        // Cari user berdasarkan username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        // Generate token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Kirim respons
        res.json({
            message: 'Login berhasil',
            token,
            user: {
                id: user.id,
                nama: user.nama,
                no_Hp: user.no_Hp,
                email: user.email,
                username: user.username,
                foto_profil: user.foto_profil,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
    }
};


