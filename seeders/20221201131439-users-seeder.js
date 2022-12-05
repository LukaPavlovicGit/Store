'use strict';

const bcrypt = require('bcrypt');

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
    await queryInterface.bulkInsert('Users', [
      {
        role:"ADMIN",
        first_name:"Luka",
        last_name:"Pavlovic",
        address:"address",
        username:"lukapav",
        email:"lpavlovic@gmail.com",
        password:bcrypt.hashSync("password", 10),
        phone_number: "064435123"
      },
      {
        role:"MODERATOR",
        first_name:"Marijana",
        last_name:"Nikolic",
        address:"address",
        username:"mnikolic",
        email:"mnikolic@gmail.com",
        password:bcrypt.hashSync("password", 10),
        phone_number: "064435111"
      },
      {
        role:"MODERATOR",
        first_name:"Nikolina",
        last_name:"Maricic",
        address:"address",
        username:"nmaricic",
        email:"nmaricic@gmail.com",
        password:bcrypt.hashSync("password", 10),
        phone_number: "064435122"
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
    await queryInterface.bulkDelete('Users', null, {});
  }
};
