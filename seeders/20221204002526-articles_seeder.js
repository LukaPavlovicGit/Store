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
        category_id:1,
        manufacturer:"HP",
        price:1000,
        number_on_stock: 10
      },
      {
        category_id:1,
        manufacturer:"DELL",
        price:1200,
        number_on_stock:7
      },
      {
        category_id:1,
        manufacturer:"ACER",
        price:800,
        number_on_stock:11
      },
      {
        category_id:2,
        manufacturer:"SAMSUNG",
        price:1000,
        number_on_stock:5
      },
      {
        category_id:2,
        manufacturer:"HUAWEI",
        price:1200,
        number_on_stock:8
      },
      {
        category_id:2,
        manufacturer:"IPHONE",
        price:1300,
        number_on_stock:4
      }
    ], {})

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles',null, {})

  }
};
