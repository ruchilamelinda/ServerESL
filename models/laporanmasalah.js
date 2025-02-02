'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LaporanMasalah extends Model {
    static associate(models) {
      LaporanMasalah.belongsTo(models.Users, { foreignKey: 'id_users' });
      LaporanMasalah.belongsTo(models.Penyewaan, { foreignKey: 'id_penyewaan' });
    }
  }
  LaporanMasalah.init({
    id_laporan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_users: DataTypes.INTEGER,
    id_penyewaan: DataTypes.INTEGER,
    masalah: DataTypes.TEXT,
    media: DataTypes.STRING,
    tanggal_laporan: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'LaporanMasalah',
  });
  return LaporanMasalah;
};