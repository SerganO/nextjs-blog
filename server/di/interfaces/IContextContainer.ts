import { IModelContainer } from "server/models/IModelContainer";
import { IServicesContainer } from "server/services";
import { IControllerContainer } from "server/controllers";
import { IEntityContainer } from "entities";
import { Sequelize } from "sequelize";

export default interface IContextContainer
  extends IModelContainer,
    IServicesContainer,
    IControllerContainer,
    IEntityContainer {
  config: any;
  db: Sequelize;
}
