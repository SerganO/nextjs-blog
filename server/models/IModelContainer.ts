import { asFunction } from "awilix";

import User, { UserType } from "models/User";
import Product, { ProductType } from "models/Product";
import Feedback, { FeedbackType } from "models/Feedback";
import IContextContainer from "./IContextContainer";

export interface IModelContainer {
  //bindModels: () => void;
  User: UserType;
  Product: ProductType;
  Feedback: FeedbackType;
}

/*const bindModels = (ctx: IContextContainer) => {
  const { User, Product, Feedback } = ctx;
  return () => {
    console.log("bind models");

    User.bind();
    Product.bind();
    Feedback.bind();
  };
};*/

export default {
  //bindModels: asFunction(bindModels).singleton(),

  User: asFunction(User).singleton(),
  Product: asFunction(Product).singleton(),
  Feedback: asFunction(Feedback).singleton(),
};
