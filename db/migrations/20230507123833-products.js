"use strict";
/** @type {import('sequelize-cli').Migration} */

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

module.exports = {
  async up(queryInterface) {
    const statement = `CREATE TABLE products (
      id int NOT NULL AUTO_INCREMENT,
      user_id int NOT NULL,
      title varchar(45) NOT NULL,
      description text,
      SKU varchar(45) NOT NULL,
      category varchar(45) NOT NULL,
      price decimal(10,0) NOT NULL,
      created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY id_UNIQUE (id),
      KEY user_id_idx (user_id),
      CONSTRAINT fk_vendor_id FOREIGN KEY (user_id) REFERENCES users (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;
    await queryInterface.sequelize.query(statement);
    await queryInterface.bulkInsert("products", products, {});
  },
  async down(queryInterface) {
    const statement = `DROP TABLE products`;
    await queryInterface.sequelize.query(statement);
  },
};
