'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Penyewaans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_users: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id_users',
        },
        onDelete: 'CASCADE',
      },
      id_properti: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Properti',
        key: 'id_properti',
      },
      onDelete: 'CASCADE',
    },
      tanggalMulai: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tanggalAkhir: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tanggalOrder: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      masaSewa: {
        type: Sequelize.INTEGER
      },
      tanggalMulai_Update: {
        type: Sequelize.DATE
      },
      tanggalAkhir_Update: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('Aktif', 'Selesai', 'Dibatalkan'),
        defaultValue:'Aktif'
      },
      alasan_batal: {
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
    await queryInterface.dropTable('Penyewaans');
  }
};