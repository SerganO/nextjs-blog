import { Model, DataTypes, BuildOptions } from "sequelize";

import IContextContainer from "server/di/interfaces/IContextContainer";

import { IUser } from "./User";
import { IFeedback } from "./Feedback";

export interface IProduct extends Model {
  id: number;
  userId: number;
  title: string;
  description: string;
  SKU: string;
  category: string;
  price: number;
  createdAt: number;
  updatedAt: number;

  vendor?: IUser;
  feedbacks?: [IFeedback];
}

export type ProductType = typeof Model & {
  new (values?: object, options?: BuildOptions): IProduct;
  //bind(): void;
};

export default (ctx: IContextContainer) => {
  const Product = <ProductType>ctx.db.define("products", {
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
      type: DataTypes.BIGINT,
    },
    updatedAt: {
      field: "updated_at",
      allowNull: false,
      type: DataTypes.BIGINT,
    },
  });

  Product.belongsTo(ctx.User, {
    foreignKey: "user_id",
    as: "vendor",
  });

  ctx.User.hasMany(Product, {
    as: "products",
    sourceKey: "id",
    foreignKey: "user_id",
    onDelete: "SET NULL",
  });

  /*Product.bind = () => {
   

   
  };

  Product.bind();*/

  return Product;
};
