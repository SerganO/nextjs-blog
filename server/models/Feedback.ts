import { Sequelize, DataTypes, Model } from "sequelize";
import { createDB } from "../db";
import User from "./User";
import Product from "./Product";

const sequelize = createDB();

/*
      id int NOT NULL AUTO_INCREMENT,
      user_id int NOT NULL,
      product_id int NOT NULL,
      rating int NOT NULL,
      message text NOT NULL,
      created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
*/

class Feedback extends Model {
  public id: number;
  public userId: number;
  public productId: number;
  public rating: number;
  public message: string;
  public createdAt: number;
  public updatedAt: number;

  public author: User;
  public product: Product;
}

Feedback.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      field: "product_id",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },

    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 512],
          msg: "message must be between 6 and 512 characters in length",
        },
      },
    },

    createdAt: {
      field: "created_at",
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    updatedAt: {
      field: "updated_at",
      allowNull: false,
      type: DataTypes.BIGINT,
    },
  },
  {
    sequelize,
    modelName: "feedbacks",
  }
);

Feedback.belongsTo(User, { foreignKey: "user_id", as: "author" });
Feedback.belongsTo(Product, { foreignKey: "product_id", as: "product" });

User.hasMany(Feedback, { as: "feedbacks" });
Product.hasMany(Feedback, { as: "feedbacks" });

export default Feedback;
