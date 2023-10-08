import { IEntityContainer } from "src/entities";
import ToastEmitter from "src/toastify/toastEmitter";
import BaseStore from "store/store";

export default interface IClientContextContainer
  extends IEntityContainer {
    store: BaseStore,
    ToastEmitter: ToastEmitter
}