import { asFunction } from "awilix";

import User, { UserType } from "models/User";
import Product, { ProductType } from "models/Product";
import Feedback, { FeedbackType } from "models/Feedback";

export interface IModelContainer {
  User: UserType;
  Product: ProductType;
  Feedback: FeedbackType;
}

export default {

  User: asFunction(User).singleton(),
  Product: asFunction(Product).singleton(),
  Feedback: asFunction(Feedback).singleton(),
};
