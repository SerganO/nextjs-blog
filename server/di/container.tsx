import IModelContainer from "server/models/IModelContainer";
import services from "server/services";
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
  ...services,
  ...controllers,
});

export default container;
