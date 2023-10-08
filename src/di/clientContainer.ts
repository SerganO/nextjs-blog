import entities from "src/entities";
import * as awilix from "awilix";
import ReduxStore from "store/store";
import { asClass } from "awilix";
import ToastEmitter from "src/toastify/toastEmitter";

const clientContainer = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

clientContainer.register({
  ...entities,
  ReduxStore:  asClass(ReduxStore).singleton(),
  ToastEmitter: asClass(ToastEmitter).singleton(),
});

export default clientContainer;
