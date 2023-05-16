"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    const statement = `CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    user_email varchar(45) NOT NULL,
    password varchar(90) NOT NULL,
    role varchar(45) NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    UNIQUE KEY user_email_UNIQUE (user_email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;
    await queryInterface.sequelize.query(statement);
  },
  async down(queryInterface) {
    const statement = `DROP TABLE users`;
    await queryInterface.sequelize.query(statement);
  },
};
