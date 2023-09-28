import { NextApiRequest, NextApiResponse } from "next";
import IContextContainer from "server/di/interfaces/IContextContainer";
import BaseController from "./BaseController";
import {GET, POST, SSR, USE} from "server/decorators";
import validate from "server/middleware/validate";
import session from "server/middleware/session";
import { actions } from "server/middleware/pasport";
import entity from "server/decorators/entity";

@entity("FeedbackEntity")
export default class FeedbackController extends BaseController {

  /**
   * getAllFeedbacks
   */
  @GET("api/feedbacks")
  public getAllFeedbacks({query, fnMessage, fnError}) {
    const userId = parseInt(query["user"]);
    const productId = parseInt(query["product"]);
    const { FeedbackService } = this.di;
    fnMessage("feedbacks info fetched success")
    fnError("Can not fetch feedbacks")
    return FeedbackService.getAllFeedbacksInfo(userId, productId)
  }

  /**
   * getFeedbackInfo
   */
  @GET("api/feedbacks/:id")
  public getFeedbackInfo({query, fnMessage, fnError}) {
    const id = query["id"] as string;
    const { FeedbackService } = this.di;
    fnMessage("feedbacks info fetched success")
    fnError("Can not fetch feedbacks")
    return FeedbackService.getFeedbackInfo(id)
  }

  /**
   * getFeedbackExtendedInfo
   */
  @GET("api/feedbacks/:id/extended")
  public getFeedbackExtendedInfo({query, fnMessage, fnError}) {
    const id = query["id"] as string;
    const { FeedbackService } = this.di;
    fnMessage("feedback extended info fetched success")
    fnError("Can not fetch feedback extended info")
    return FeedbackService.getFeedbackExtendedInfo(id)
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
  public addFeedback({query, user, session, fnMessage, fnError}) {
    const body = query
    console.log("controller add feedback ");
    console.log("session: ", session)
    console.log("session.passport: ", session.passport)
    console.log("session.passport.user: ", session.passport.user)
    let bodyString = JSON.stringify(body);
    let bodyData = JSON.parse(bodyString);

    const userId: number = parseInt(bodyData["user_id"] as string);

    const productId: number = parseInt(bodyData["product_id"] as string);
    const rating: number = parseInt(bodyData["rating"] as string);
    const message: string = bodyData["message"] as string;

    if (userId && productId && rating && message) {
      const { FeedbackService } = this.di;
      fnMessage("feedback added success")
      fnError("Can not add feedback")
      return FeedbackService.addFeedback(userId, productId, rating, message)
    } else {
      throw Error("Can not add feedback: not full data");
    }
  }
}
