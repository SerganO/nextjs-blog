import { trace } from "console";
import IContextContainer from "./interfaces/IContextContainer ";

export default class BaseContext {
  protected di: IContextContainer;
  //private static stopInit: boolean = false;

  constructor(opts: IContextContainer) {
    this.di = opts;
    console.log("dI: ", opts);
    console.log("config: ", opts.config);
    //trace();
    /*if (!BaseContext.stopInit) {
            opts.initModels();
            BaseContext.stopInit = true;
        } */
  }
}
