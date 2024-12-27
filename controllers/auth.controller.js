const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    Sequelize
} = require('sequelize');
const User = require('../models').Users;


// Register User
exports.register = async (req, res) => {
    try {
        console.log(req.body);
        const {
            nama,
            no_Hp,
            email,
            username,
            password
        } = req.body;
        if (!nama || !no_Hp || !email || !username || !password) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }
        const existingUser = await User.findOne({

            where: {
                [Sequelize.Op.or]: [{
                        email: email
                    },
                    {
                        username: username
                    }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({
                error: 'Email or username already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            nama,
            no_Hp,
            email,
            username,
            password: hashedPassword,
            foto_profil: null,
        });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Error di endpoint register:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
};


// Login User
exports.login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        // Log data yang diterima dari frontend
        console.log("Data diterima:", req.body);

        // Validasi input
        if (!username || !password) {
            return res.status(400).json({
                message: 'Username dan password harus diisi'
            });
        }

        // Cari user berdasarkan username
        const user = await User.findOne({
            where: {
                username
            }
        });
        if (!user) {
            return res.status(404).json({
                message: 'User tidak ditemukan'
            });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
            const token = jwt.sign({
    
                    id: user.id_users,
    
                },
                process.env.JWT_SECRET, {
                    expiresIn: '15h'
                }
            );
    
            // Kirim respons
            res.json({
                message: 'Login berhasil',
                token,
                user: {
                    id: user.id_users,
                    nama: user.nama,
                    no_Hp: user.no_Hp,
                    email: user.email,
                    username: user.username,
                    foto_profil: user.foto_profil,
                },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Terjadi kesalahan server',
            error: error.message
        });
    }
};