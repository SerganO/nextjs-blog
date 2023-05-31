import IModelContainer from "./interfaces/IModelContainer";
import IServicesContainer from "./interfaces/IServicesContainer";
import IControllerContainer from "./interfaces/IControllerContainer";
import { createDB } from "../db";
import { config } from "coreConfig";

const awilix = require("awilix");

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  config: awilix.asValue(config),
  db: awilix.asFunction(createDB).singleton(),
  //...IModelContainer,
  ...IControllerContainer,
  ...IServicesContainer,
});

export default container;
