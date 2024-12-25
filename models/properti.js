'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Properti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Properti.hasMany(models.Favorit, { foreignKey: 'id_properti' });
      Properti.hasMany(models.Penyewaan, { foreignKey: 'id_properti' });
    }
  }
  Properti.init({
    id_properti: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_properti: DataTypes.STRING,
    jenis_properti: DataTypes.ENUM('Kendaraan', 'Rumah'),
    deskripsi: DataTypes.TEXT,
    pemilik: DataTypes.STRING,
    hargaSewa: DataTypes.INTEGER,
    lokasi: DataTypes.STRING,
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    status_properti: DataTypes.BOOLEAN,
    foto_properti: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Properti',
  });
  return Properti;
};