'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      location: {
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
    await queryInterface.dropTable('Stores');
  }
};