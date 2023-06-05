import { asClass } from "awilix";
import UserService from "services/UserService";
import ProductService from "services/ProductService";
import FeedbackService from "services/FeedbackService";

export interface IServicesContainer {
  UserService: UserService;
  ProductService: ProductService;
  FeedbackService: FeedbackService;
}

export default {
  UserService: asClass(UserService).singleton(),
  ProductService: asClass(ProductService).singleton(),
  FeedbackService: asClass(FeedbackService).singleton(),
};
