//import { IModelContainer } from "./IModelContainer";
import { IServicesContainer } from "./IServicesContainer";
import { IHelpersContainer } from "./IHelpersContainer";
import { Sequelize } from "sequelize";

export default interface IContextContainer /* IModelContainer,*/
  extends IServicesContainer,
    IHelpersContainer {
  config: any;

  db: Sequelize;
}
