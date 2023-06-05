import { asClass } from "awilix";
import UserController from "controllers/UserController";
import ProductController from "controllers/ProductController";
import FeedbackController from "controllers/FeedbackController"

export interface IControllerContainer {
  UserController: UserController;
  ProductController: ProductController;
  FeedbackController: FeedbackController;
}

export default {
  UserController: asClass(UserController).singleton(),
  ProductController: asClass(ProductController).singleton(),
  FeedbackController: asClass(FeedbackController).singleton(),
};
