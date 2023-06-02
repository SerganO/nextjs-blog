import { trace } from "console";
import IContextContainer from "./interfaces/IContextContainer";

export default class BaseContext {
  protected di: IContextContainer;

  constructor(opts: IContextContainer) {
    this.di = opts;
  }
}
