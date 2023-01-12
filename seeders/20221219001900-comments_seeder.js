'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        rate: 10,
        text: "GREATE",
        user_id: 1,
        article_id: 1
      },
      {
        rate: 8,
        text: "NICE",
        user_id: 2,
        article_id: 1
      },
      {
        rate: 2,
        text: "ANYTHING SPECIAL",
        user_id: 3,
        article_id: 1
      },
      {
        rate: 10,
        text: "SUPERB",
        user_id: 3,
        article_id: 1
      }

    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments',null, {})
  }
};