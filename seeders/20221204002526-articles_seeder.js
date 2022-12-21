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
        name:"15s-eq3011nm",
        price:1000
      },
      {
        category_id:1,
        manufacturer:"HP",
        name:"15s-eq3011nm",
        price:1000
      },
      {
        category_id:1,
        manufacturer:"HP",
        name:"15s-eq3011nm",
        price:1000
      },
      {
        category_id:1,
        manufacturer:"HP",
        name:"15s-eq3011nm",
        price:1000
      },
      {
        category_id:1,
        manufacturer:"DELL",
        name:"ProBook 450",
        price:1200
      },
      {
        category_id:1,
        manufacturer:"DELL",
        name:"ProBook 450",
        price:1200
      },
      {
        category_id:1,
        manufacturer:"DELL",
        name:"ProBook 450",
        price:1200
      },
      {
        category_id:1,
        manufacturer:"ACER",
        name:"Aspire 7",
        price:800
      },
      {
        category_id:1,
        manufacturer:"ACER",
        name:"Aspire 7",
        price:800
      },
      {
        category_id:2,
        manufacturer:"SAMSUNG",
        name:"S 22",
        price:1000
      },
      {
        category_id:2,
        manufacturer:"SAMSUNG",
        name:"S 22",
        price:1000
      },
      {
        category_id:2,
        manufacturer:"SAMSUNG",
        name:"S 22",
        price:1000
      },
      {
        category_id:2,
        manufacturer:"HUAWEI",
        name:"P40",
        price:1200
      },
      {
        category_id:2,
        manufacturer:"HUAWEI",
        name:"P40",
        price:1200
      },
      {
        category_id:2,
        manufacturer:"IPHONE",
        name:"iphone14",
        price:1300
      },
      {
        category_id:2,
        manufacturer:"IPHONE",
        name:"iphone14",
        price:1300
      }
    ], {})

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles',null, {})

  }
};
