import { NextApiRequest, NextApiResponse } from "next";
import IContextContainer from "server/di/interfaces/IContextContainer";
import BaseController from "./BaseController";
import {GET, POST, SSR, USE} from "server/decorators";
import validate from "server/middleware/validate";
import session from "server/middleware/session";
import { actions } from "server/middleware/pasport";

export default class FeedbackController extends BaseController {
  constructor(opts: IContextContainer) {
    super(opts);
    console.log("FeedbackController init: ", this);
    console.log("di: ", this.di);
  }

  /**
   * getAllFeedbacks
   */
  @GET("api/feedbacks")
  public getAllFeedbacks(query: any) {
    const userId = parseInt(query["user"]);
    const productId = parseInt(query["product"]);
    const { FeedbackService } = this.di;
    return FeedbackService.getAllFeedbacksInfo(userId, productId);
  }

  /**
   * getFeedbackInfo
   */
  @GET("api/feedbacks/:id")
  public getFeedbackInfo(query: any) {
    const id = query["id"] as string;
    const { FeedbackService } = this.di;
    return FeedbackService.getFeedbackInfo(id);
  }

  /**
   * getFeedbackExtendedInfo
   */
  @GET("api/feedbacks/:id/extended")
  public getFeedbackExtendedInfo(query: any) {
    const id = query["id"] as string;
    const { FeedbackService } = this.di;
    return FeedbackService.getFeedbackExtendedInfo(id);
  }

  /**
   * addFeedback
   */
  @USE([session])
  @USE(
    validate({
      type: 'object',
      properties: {
        user_id: {type: "number"},
        product_id: {type: "number"},
        rating: {type: "number"},
        message: {type: "string"},
      },
      required: ['product_id','rating','message'],
      additionalProperties: false,
    })
  )
  @POST("api/feedbacks/add")
  public addFeedback(body: any, user, session) {
    console.log("controller add feedback ");
    console.log("session: ", session)
    console.log("session.passport: ", session.passport)
    console.log("session.passport.user: ", session.passport.user)
    let bodyString = JSON.stringify(body);
    let bodyData = JSON.parse(bodyString);

    const userId: number = parseInt(bodyData["user_id"] as string);

    /*if(!userId) {
      userId = user?.id
    }*/

    const productId: number = parseInt(bodyData["product_id"] as string);
    const rating: number = parseInt(bodyData["rating"] as string);
    const message: string = bodyData["message"] as string;

    if (userId && productId && rating && message) {
      const { FeedbackService } = this.di;
      return FeedbackService.addFeedback(userId, productId, rating, message);
    } else {
      //const { FeedbackService } = this.di;
      //return FeedbackService.addFeedback(userId, productId, rating, message);
   
      throw Error("not full data");
    }
  }
}
