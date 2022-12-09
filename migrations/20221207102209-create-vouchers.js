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
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      value: {
        type: DataTypes.INTEGER
      },
      comment: {
        type: DataTypes.STRING
      },
      createdAt: {
        defaultValue: new Date(),
        type: DataTypes.DATE
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