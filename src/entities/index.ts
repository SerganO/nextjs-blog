import { asClass } from "awilix";

import ProductEntity from "./ProductEntity";
import PageEntity from "./PageEntity";
import UserEntity from "./UserEntity";
import FeedbackEntity from "./FeedbackEntity";

export interface IEntityContainer {
  ProductEntity: ProductEntity;
  PageEntity: PageEntity;
  UserEntity: UserEntity;
  FeedbackEntity: FeedbackEntity;
}

export default {
  ProductEntity: asClass(ProductEntity).singleton(),
  PageEntity: asClass(PageEntity).singleton(),
  UserEntity: asClass(UserEntity).singleton(),
  FeedbackEntity: asClass(FeedbackEntity).singleton(),
};
