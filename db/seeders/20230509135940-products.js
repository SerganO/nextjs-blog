"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { faker } = require("@faker-js/faker");

    const products = [...Array(2500).keys()].map((product_index) => ({
      user_id: 2 + parseInt(product_index / 50),

      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      SKU: faker.random.alphaNumeric(8),
      category: faker.commerce.department(),
      price: faker.commerce.price(),

      created_at: new Date(),
      updated_at: new Date(),
    }));
    await queryInterface.bulkInsert("products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
