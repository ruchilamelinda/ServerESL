'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Propertis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_properti: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jenis_properti: {
        type: Sequelize.ENUM('Kendaraan', 'Rumah'),
        allowNull: false,
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      pemilik: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hargaSewa: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lokasi: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true
      },
      status_properti: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      foto_properti: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Propertis');
  }
};