const jwt = require('jsonwebtoken');

// token login
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Token dikirim via header Authorization: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak, token tidak ditemukan' });
    }

    // Verifikasi token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token tidak valid' });
        }

        req.user = user; // Tambahkan data user ke dalam request
        next(); // Lanjutkan ke route berikutnya
    });
};

module.exports = authenticateJWT;