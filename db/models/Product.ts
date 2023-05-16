import { Sequelize, BelongsTo, DataTypes, Model } from "sequelize";
import { createDB } from "../../lib/db";
import User from "./User";

const sequelize = createDB();

/*id int NOT NULL AUTO_INCREMENT,
user_id int DEFAULT NULL,
title varchar(45) NOT NULL,
description text,
SKU varchar(45) NOT NULL,
category varchar(45) NOT NULL,
price decimal(10,0) NOT NULL,
created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,*/
class Product extends Model {
  public id: number;
  public userId: number;
  public title: string;
  public description: string;
  public SKU: string;
  public category: string;
  public price: number;
  public createdAt: Date;
  public updatedAt: Date;

  public vendor?: User;
}
Product.init(
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
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: "title must be between 6 and 255 characters in length",
        },
      },
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 2048],
          msg: "description must be between 6 and 2048 characters in length",
        },
      },
    },

    SKU: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNonNegative(value) {
          if (parseInt(value) < 0) {
            throw new Error("price must be greater or equal than 0.");
          }
        },
      },
    },

    createdAt: {
      field: "created_at",
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_at",
      allowNull: false,
      type: DataTypes.DATE,
    },
  },

  { sequelize, modelName: "products" }
);

Product.belongsTo(User, {
  foreignKey: "user_id",
  as: "vendor",
});

User.hasMany(Product, { as: "products" });

export default Product;
