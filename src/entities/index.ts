import { asClass } from "awilix";

import ProductEntity from "./ProductEntity";
import UserEntity from "./UserEntity";
import FeedbackEntity from "./FeedbackEntity";
import Identity from "./Identity";

export interface IEntityContainer {
  ProductEntity: ProductEntity;
  UserEntity: UserEntity;
  FeedbackEntity: FeedbackEntity;
  Identity: Identity;
  
}

export default {
  ProductEntity: asClass(ProductEntity).singleton(),
  UserEntity: asClass(UserEntity).singleton(),
  FeedbackEntity: asClass(FeedbackEntity).singleton(),
  Identity: asClass(Identity).singleton(),
};
