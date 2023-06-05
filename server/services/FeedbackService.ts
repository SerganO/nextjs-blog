import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer";

export default class FeedbackService extends BaseContext {
  constructor(opts: IContextContainer) {
    super(opts);
    this.di = opts;
    console.log("FeedbackService init: ", this);
    console.log("di: ", this.di);
  }

}