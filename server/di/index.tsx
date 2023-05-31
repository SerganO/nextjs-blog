import IModelContainer from "./interfaces/IModelContainer";
import IServicesContainer from "./interfaces/IServicesContainer";
import IHelpersContainer from "./interfaces/IHelpersContainer";
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
  ...IHelpersContainer,
  ...IServicesContainer,
});

export default container;
