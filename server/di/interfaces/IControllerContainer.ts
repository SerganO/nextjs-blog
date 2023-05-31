import { asClass } from "awilix";
import UserController from "controllers/UserController";
import ProductController from "controllers/ProductController";

export interface IControllerContainer {
  UserController: UserController;
  ProductController: ProductController;
}

export default {
  UserController: asClass(UserController).singleton(),
  ProductController: asClass(ProductController).singleton(),
};
