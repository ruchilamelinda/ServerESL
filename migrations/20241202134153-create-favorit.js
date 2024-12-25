'use strict';
/** @type {import('sequelize-cli').Migration} */

//tabel favorit
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favorits', {
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
      tanggal_ditambahkan: {
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
    await queryInterface.dropTable('Favorits');
  }
};