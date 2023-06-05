import { NextApiRequest, NextApiResponse } from "next";
import IContextContainer from "server/di/interfaces/IContextContainer";
import BaseController from "./BaseController";

export default class FeedbackController extends BaseController {
  constructor(opts: IContextContainer) {
    super(opts);
    console.log("FeedbackController init: ", this);
    console.log("di: ", this.di);
  }

}