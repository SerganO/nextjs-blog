import { NextApiRequest, NextApiResponse } from "next";
import IContextContainer from "server/di/interfaces/IContextContainer";
import BaseController from "./BaseController";
export default class FeedbackController extends BaseController {
  constructor(opts: IContextContainer) {
    super(opts);
    console.log("FeedbackController init: ", this);
    console.log("di: ", this.di);

    this.getAllFeedbacks = this.getAllFeedbacks.bind(this);
    this.getFeedbackInfo = this.getFeedbackInfo.bind(this);
    this.getFeedbackExtendedInfo = this.getFeedbackExtendedInfo.bind(this);
    this.addFeedback = this.addFeedback.bind(this);
  }

  /**
   * getAllFeedbacks
   */
  public getAllFeedbacks(query: any) {
    const userId = parseInt(query["user"]);
    const productId = parseInt(query["product"]);
    const { FeedbackService } = this.di;
    return FeedbackService.getAllFeedbacksInfo(userId, productId);
  }

  /**
   * getFeedbackInfo
   */
  public getFeedbackInfo(query: any) {
    const id = query["id"] as string;
    const { FeedbackService } = this.di;
    return FeedbackService.getFeedbackInfo(id);
  }

  /**
   * getFeedbackExtendedInfo
   */
  public getFeedbackExtendedInfo(query: any) {
    const id = query["id"] as string;
    const { FeedbackService } = this.di;
    return FeedbackService.getFeedbackExtendedInfo(id);
  }

  /**
   * addFeedback
   */
  public addFeedback(body: any) {
    console.log("controller add feedback ");
    let bodyString = JSON.stringify(body);
    let bodyData = JSON.parse(bodyString);

    const userId: number = parseInt(bodyData["user_id"] as string);
    const productId: number = parseInt(bodyData["product_id"] as string);
    const rating: number = parseInt(bodyData["rating"] as string);
    const message: string = bodyData["message"] as string;

    if (userId && productId && rating && message) {
      const { FeedbackService } = this.di;
      return FeedbackService.addFeedback(userId, productId, rating, message);
    } else {
      throw Error("not full data");
    }
  }
}
