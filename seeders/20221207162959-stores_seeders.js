'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stores', [
      {
        location: 'Jurija Gagarina 156'
      },
      {
        location: 'Stefana Nemanje 19'
      },
      {
        location: 'Kneza Mihaila 11'
      },
      {
        location: 'Pozeska 30'
      }

      ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stores',null, {})
  }
};
