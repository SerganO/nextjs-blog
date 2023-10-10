import { Model, DataTypes, BuildOptions } from "sequelize";
import { IProduct } from "./Product";
import { IFeedback } from "./Feedback";

import IContextContainer from "server/di/interfaces/IContextContainer";

export interface IUser extends Model {
  id: number;
  firstName: string;
  lastName: string;
  userEmail: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;

  products?: [IProduct];
  feedbacks?: [IFeedback];
}

export type UserType = typeof Model & {
  new (values?: object, options?: BuildOptions): IUser;
};

export default (ctx: IContextContainer) => {
  const User = <UserType>ctx.db.define("users", {
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
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_at",
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  return User;
};
