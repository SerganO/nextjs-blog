import { asClass } from "awilix";

import ProductEntity from "./ProductEntity";
import PageEntity from "./PageEntity";
import MainPageInfoEntity from "./MainPageInfoEntity";
import UserEntity from "./UserEntity";

export interface IEntityContainer {
  ProductEntity: ProductEntity;
  PageEntity: PageEntity;
  MainPageInfoEntity: MainPageInfoEntity;
  UserEntity: UserEntity;
}

export default {
  ProductEntity: asClass(ProductEntity).singleton(),
  PageEntity: asClass(PageEntity).singleton(),
  MainPageInfoEntity: asClass(MainPageInfoEntity).singleton(),
  UserEntity: asClass(UserEntity).singleton(),
};
