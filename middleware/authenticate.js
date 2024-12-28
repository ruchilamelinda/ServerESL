const jwt = require('jsonwebtoken');

// token login
const authenticateJWT = (req, res, next) => {
    console.log('Headers:', req.headers); // Log semua header permintaan
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 
    console.log('Extracted Token:', token);
    
    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak, token tidak ditemukan' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT Error:', err.message); // Log kesalahan JWT
            return res.status(403).json({ message: 'Token tidak valid' });
        }

        console.log('Decoded User:', user); // Log data user dari token
        req.user = user; 
        next(); 
    });
};

module.exports = authenticateJWT;
