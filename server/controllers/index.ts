import { asClass } from "awilix";
import UserController from "controllers/UserController";
import ProductController from "controllers/ProductController";
import FeedbackController from "controllers/FeedbackController"
import AuthController from "./AuthController";

export interface IControllerContainer {
  UserController: UserController;
  ProductController: ProductController;
  FeedbackController: FeedbackController;
  //AuthController: AuthController;
}

export default {
  UserController: asClass(UserController).singleton(),
  ProductController: asClass(ProductController).singleton(),
  FeedbackController: asClass(FeedbackController).singleton(),
  //AuthController: asClass(AuthController).singleton(),
};
