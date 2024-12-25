'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LaporanMasalahs', {
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
      id_penyewaan: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Penyewaan',
          key: 'id_penyewaan',
        },
        onDelete: 'CASCADE',
      },
      masalah: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      media: {
        type: Sequelize.STRING
      },
      tanggal_laporan: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
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
    await queryInterface.dropTable('LaporanMasalahs');
  }
};