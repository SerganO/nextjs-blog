import { IModelContainer } from "./IModelContainer";
import { IServicesContainer } from "./IServicesContainer";
import { IControllerContainer } from "./IControllerContainer";
import { Sequelize } from "sequelize";

export default interface IContextContainer
  extends IModelContainer,
    IServicesContainer,
    IControllerContainer {
  config: any;
  db: Sequelize;
}
