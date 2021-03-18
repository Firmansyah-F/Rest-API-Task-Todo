'use strict';
const faker = require("faker");
faker.locale = "id_ID"; // localization Indonesia


const comment = [...Array(10)].map((comment) => {
    return {
      userId: faker.random.number({min:1,max:10}),
      taskId: faker.random.number({min:1,max:10}),
      comment: faker.lorem.words(),
      createdAt : faker.date.recent(),
      updatedAt : faker.date.recent()
    };
});


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("comments",comment)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
