import { asClass } from "awilix";

import User from "models/User";
import Product from "models/Product";
import Feedback from "models/Feedback";

export interface IModelContainer {
  User: User;
  Product: Product;
  Feedback: Feedback;
}

export default {
  User: asClass(User).scoped(),
  Product: asClass(Product).scoped(),
  Feedback: asClass(Feedback).scoped(),
};
