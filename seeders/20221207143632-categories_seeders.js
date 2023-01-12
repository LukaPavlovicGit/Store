'use strict';

const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Laptop'
      },
      {
        name: 'Mobile'
      }
      ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories',null, {})
  }
};
