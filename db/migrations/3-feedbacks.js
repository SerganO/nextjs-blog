"use strict";
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up(queryInterface) {
    const statement = `CREATE TABLE feedbacks (
      id int NOT NULL AUTO_INCREMENT,
      user_id int NOT NULL,
      product_id int NOT NULL,
      rating int NOT NULL,
      message text NOT NULL,
      created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY id_UNIQUE (id),
      KEY user_id_idx (user_id),
      KEY product_id_idx (product_id),
      CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
      CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `;
    await queryInterface.sequelize.query(statement);
  },
  async down(queryInterface) {
    const statement = `DROP TABLE feedbacks`;
    await queryInterface.sequelize.query(statement);
  },
};
