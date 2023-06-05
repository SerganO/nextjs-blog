import { IModelContainer } from "server/models/IModelContainer";
import { IServicesContainer } from "server/services";
import { IControllerContainer } from "server/controllers";
import { Sequelize } from "sequelize";

export default interface IContextContainer
  extends IModelContainer,
    IServicesContainer,
    IControllerContainer {
  config: any;
  db: Sequelize;
}
