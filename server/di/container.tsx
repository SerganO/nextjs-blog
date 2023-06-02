import IModelContainer from "./interfaces/IModelContainer";
import IServicesContainer from "./interfaces/IServicesContainer";
import controllers from "server/controllers";
import { createDB } from "../db";
import { config } from "coreConfig";

import * as awilix from "awilix";

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  config: awilix.asValue(config),
  db: awilix.asFunction(createDB).singleton(),
  ...IModelContainer,
  ...controllers,
  ...IServicesContainer,
});

export default container;
