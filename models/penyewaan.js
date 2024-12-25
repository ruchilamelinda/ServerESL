'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penyewaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Penyewaan.belongsTo(models.Users, { foreignKey: 'id_users' });
      Penyewaan.belongsTo(models.Properti, { foreignKey: 'id_properti' });
      Penyewaan.hasMany(models.Ulasan, { foreignKey: 'id_penyewaan' });
    }
  }
  Penyewaan.init({
    id_penyewaan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_users: DataTypes.INTEGER,
    id_properti: DataTypes.INTEGER,
    tanggalMulai: DataTypes.DATE,
    tanggalAkhir: DataTypes.DATE,
    tanggalOrder: DataTypes.DATE,
    masaSewa: DataTypes.INTEGER,
    tanggalMulai_Update: DataTypes.DATE,
    tanggalAkhir_Update: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM('Aktif', 'Selesai', 'Dibatalkan'),
      defaultValue:'Aktif'},
    alasan_batal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Penyewaan',
  });
  return Penyewaan;
};