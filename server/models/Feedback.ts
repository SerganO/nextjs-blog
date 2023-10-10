import { Model, DataTypes, BuildOptions } from "sequelize";

import IContextContainer from "server/di/interfaces/IContextContainer";
import { IUser } from "./User";

export interface IFeedback extends Model {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;

  author?: IUser;
}

export type FeedbackType = typeof Model & {
  new (values?: object, options?: BuildOptions): IFeedback;
};

export default (ctx: IContextContainer) => {
  const Feedback = <FeedbackType>ctx.db.define("feedbacks", {
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
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_at",
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  Feedback.belongsTo(ctx.User, { foreignKey: "user_id", as: "author" });
  Feedback.belongsTo(ctx.Product, {
    foreignKey: "product_id",
    as: "product",
  });
  ctx.Product.hasMany(Feedback, {
    as: "feedbacks",
    sourceKey: "id",
    foreignKey: "product_id",
    onDelete: "CASCADE",
  });
  ctx.User.hasMany(Feedback, {
    as: "feedbacks",
    sourceKey: "id",
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

  return Feedback;
};
