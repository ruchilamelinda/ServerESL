'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ulasan extends Model {
    static associate(models) {
      Ulasan.belongsTo(models.Users, { foreignKey: 'id_users' });
      Ulasan.belongsTo(models.Penyewaan, { foreignKey: 'id_penyewaan' });
    }
  }
  Ulasan.init({
    id_ulasan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_users: DataTypes.INTEGER,
    id_penyewaan: DataTypes.INTEGER,
    ulasan: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    media_ulasan: DataTypes.STRING,
    tanggal_input: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Ulasan',
  });
  return Ulasan;
};