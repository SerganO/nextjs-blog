import { trace } from "console";
import IContextContainer from "./interfaces/IContextContainer";

export default class BaseContext {
  protected di: IContextContainer;
  //private static stopInit: boolean = false;

  constructor(opts: IContextContainer) {
    this.di = opts;
    //trace();
    /*if (!BaseContext.stopInit) {
      opts.bindModels();
      BaseContext.stopInit = true;
    }*/
  }
}
