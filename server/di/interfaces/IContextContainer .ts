//import { IModelContainer } from "./IModelContainer";
import { IServicesContainer } from "./IServicesContainer";
import { IControllerContainer } from "./IControllerContainer";
import { Sequelize } from "sequelize";

export default interface IContextContainer /* IModelContainer,*/
  extends IServicesContainer,
    IControllerContainer {
  config: any;

  db: Sequelize;
}
