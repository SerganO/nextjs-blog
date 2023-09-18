import { asClass } from "awilix";

import ProductEntity from "./ProductEntity";
import UserEntity from "./UserEntity";
import FeedbackEntity from "./FeedbackEntity";

export interface IEntityContainer {
  ProductEntity: ProductEntity;
  UserEntity: UserEntity;
  FeedbackEntity: FeedbackEntity;
}

export default {
  ProductEntity: asClass(ProductEntity).singleton(),
  UserEntity: asClass(UserEntity).singleton(),
  FeedbackEntity: asClass(FeedbackEntity).singleton(),
};
