import { Sequelize, DataTypes, Model } from "sequelize";
import { createDB } from "../db";
import Product from "./Product";
import Feedback from "./Feedback";

const sequelize = createDB();

/*
id int NOT NULL AUTO_INCREMENT,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    user_email varchar(45) NOT NULL,
    password varchar(90) NOT NULL,
    role varchar(45) NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
*/

class User extends Model {
  public id: number;
  public firstName: string;
  public lastName: string;
  public userEmail: string;
  public password: string;
  public role: string;
  public createdAt: number;
  public updatedAt: number;

  public products?: [Product];
  public feedbacks?: [Feedback];
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      field: "first_name",
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 255],
          msg: "Name must be between 3 and 255 characters in length",
        },
      },
    },
    lastName: {
      field: "last_name",
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 255],
          msg: "Name must be between 3 and 255 characters in length",
        },
      },
    },
    userEmail: {
      field: "user_email",
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [6, 255],
          msg: "Email address must be between 6 and 255 characters in length",
        },
        isEmail: {
          msg: "Email address must be valid",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 255],
          msg: "Password must be between 8 and 255 characters in length",
        },
      },
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["admin", "vendor", "client"]],
          msg: "Role valid values: admin, vendor, client",
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
    modelName: "users",
  }
);

export default User;
