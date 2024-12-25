'use strict';
/** @type {import('sequelize-cli').Migration} */

//tabel ilasan
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ulasans', {
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
      ulasan: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rating: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      media_ulasan: {
        type: Sequelize.STRING
      },
      tanggal_input: {
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
    await queryInterface.dropTable('Ulasans');
  }
};