'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifikasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notifikasi.belongsTo(models.Users, { foreignKey: 'id_users' });
    }
  }
  Notifikasi.init({
    id_notifikasi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_users: DataTypes.INTEGER,
    tanggal_kirim: DataTypes.DATE,
    status_notifikasi: {
      type: DataTypes.ENUM,
    values: ["read", "unread"],
  }
}, {
    sequelize,
    modelName: 'Notifikasi',
  });
  return Notifikasi;
};