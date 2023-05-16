"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { faker } = require("@faker-js/faker");

    const feedbacks = [...Array(2500).keys()].map((feedback_index) => ({
      user_id: 51 + parseInt(feedback_index / 50),
      product_id: 1 + faker.datatype.number(2499),
      rating: faker.datatype.number(5),
      message: faker.lorem.sentence(25),

      created_at: new Date(),
      updated_at: new Date(),
    }));
    await queryInterface.bulkInsert("feedbacks", feedbacks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("feedbacks", null, {});
  },
};
