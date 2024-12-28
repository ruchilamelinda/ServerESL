const express = require('express');
const {Favorit} = require('../models');
const {Properti} = require('../models');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticate');
const { where } = require('sequelize');

router.get('/',authenticateJWT, async (req, res) => {
    try{
        const userId = req.user.id;
        console.log(userId, "ampun bg");

        const favorite = await Favorit.findAll({
            where:{id_users: userId},
            include:[{
                model:Properti,
                attributes: ['nama_properti', 'pemilik', 'hargaSewa', 'lokasi']
            }]
        });

        const formattedFavorite = favorite.map((favorite) => ({
            id_favorite: favorite.id_favorite || "Tidak diketahui",
            id_properti: favorite.id_properti || "Tidak diketahui",
            nama_properti: favorite.Properti?.nama_properti || "Tidak diketahui",
            pemilik: favorite.Properti?.pemilik || "Tidak diketahui",
            lokasi: favorite.Properti?.lokasi || "Tidak diketahui",
            hargaSewa: favorite.Properti?.hargaSewa || "Tidak diketahui",
        }));
        res.json(formattedFavorite);
    
    } catch(error){
        res.status(500).json({message: 'Server Error', error: error.message});
    }
});
module.exports = router;