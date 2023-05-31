import { asClass } from "awilix";
import UserService from "services/UserService";
import ProductService from "services/ProductService";

export interface IServicesContainer {
  UserService: UserService;
  ProductService: ProductService;
}

export default {
  UserService: asClass(UserService).singleton(),
  ProductService: asClass(ProductService).singleton(),
};
