"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    const statement = `CREATE TABLE products (
      id int NOT NULL AUTO_INCREMENT,
      user_id int DEFAULT NULL,
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
      CONSTRAINT fk_vendor_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `;
    await queryInterface.sequelize.query(statement);
  },
  async down(queryInterface) {
    const statement = `DROP TABLE products`;
    await queryInterface.sequelize.query(statement);
  },
};
