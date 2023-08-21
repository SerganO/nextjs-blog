import { IEntityContainer } from "src/entities";
import BaseStore from "store/store";

export default interface IClientContextContainer
  extends IEntityContainer {
    store: BaseStore
}