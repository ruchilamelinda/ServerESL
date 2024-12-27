const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../public/uploads/');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filter jenis file (MIME Types)
const fileFilter = (req, file, cb) => {
    console.log("Received file:", file); // Log file yang diterima
    const allowedMimeTypes = [
        "image/jpeg", 
        "image/png", 
        "image/gif", 
        "image/webp", 
        "image/bmp", 
        "application/pdf"
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        console.log("Invalid file type:", file.mimetype); // Log tipe file yang tidak valid
        cb(new Error("Invalid file type! Only JPEG, PNG, GIF, WEBP, BMP, and PDF are allowed."), false);
    }
};

// Middleware multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // Maksimal 10MB (Ditingkatkan untuk mendukung gambar besar)
    fileFilter: fileFilter,
});

module.exports = upload;