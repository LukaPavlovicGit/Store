'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
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
    await queryInterface.dropTable('Articles');
  }
};