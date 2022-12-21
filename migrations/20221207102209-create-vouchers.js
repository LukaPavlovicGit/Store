'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vouchers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      },
      updatedAt: {
        defaultValue: new Date(),
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Vouchers');
  }
};