'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Deliveries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      way_of_delivery: {
        type: DataTypes.STRING,
        allowNull:false
      },
      address: {
        type: DataTypes.STRING,
        allowNull:false
      },
      total_price: {
        type: DataTypes.DOUBLE,
        defaultValue:0
      },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull:false
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
    await queryInterface.dropTable('Deliveries');
  }
};