'use strict';

const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Articles', [
      {
        type:"LAPTOP",
        manufacturer:"HP",
        price:1000,
        number_on_stock: 10
      },
      {
        type:"LAPTOP",
        manufacturer:"DELL",
        price:1200,
        number_on_stock:7
      },
      {
        type:"LAPTOP",
        manufacturer:"ACER",
        price:800,
        number_on_stock:11
      },
      {
        type:"MOBILE",
        manufacturer:"SAMSUNG",
        price:1000,
        number_on_stock:5
      },
      {
        type:"MOBILE",
        manufacturer:"HUAWEI",
        price:1200,
        number_on_stock:8
      },
      {
        type:"MOBILE",
        manufacturer:"IPHONE",
        price:1300,
        number_on_stock:4
      }
    ], {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
