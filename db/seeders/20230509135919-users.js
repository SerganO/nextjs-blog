"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { faker } = require("@faker-js/faker");

    const admin = [
      {
        first_name: "admin",
        last_name: "admin",
        user_email: "admin@gmail.com",
        password: "admin",
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const vendors = [...Array(50).keys()].map((user_id) => ({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      user_email: faker.internet.email(),
      password: faker.internet.password(8),
      role: "vendor",
      created_at: new Date(),
      updated_at: new Date(),
    }));

    const clients = [...Array(50).keys()].map((user_id) => ({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      user_email: faker.internet.email(),
      password: faker.internet.password(8),
      role: "client",
      created_at: new Date(),
      updated_at: new Date(),
    }));
    await queryInterface.bulkInsert("users", admin, {});
    await queryInterface.bulkInsert("users", vendors, {});
    await queryInterface.bulkInsert("users", clients, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
