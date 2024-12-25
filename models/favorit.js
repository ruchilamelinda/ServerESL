'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favorit.belongsTo(models.Users, { foreignKey: 'id_users' });
      Favorit.belongsTo(models.Properti, { foreignKey: 'id_properti' });
    }
  }
  Favorit.init({
    id_favorit: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_users: DataTypes.INTEGER,
    id_properti: DataTypes.INTEGER,
    tanggal_ditambahkan: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Favorit',
  });
  return Favorit;
};