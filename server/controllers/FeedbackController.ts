import BaseController from "./BaseController";
import { GET, POST, SSR, USE } from "server/decorators";
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
  public getAllFeedbacks({ query, fnMessage, fnError }) {
    const userId = parseInt(query["user"]);
    const productId = parseInt(query["product"]);
    const { FeedbackService } = this.di;
    fnMessage("feedbacks info fetched success");
    fnError("Can not fetch feedbacks");
    return FeedbackService.getAllFeedbacksInfo(userId, productId);
  }

  /**
   * getFeedbackInfo
   */
  @GET("api/feedbacks/:id")
  public getFeedbackInfo({ query, fnMessage, fnError }) {
    const id = query["id"] as string;
    const { FeedbackService } = this.di;
    fnMessage("feedbacks info fetched success");
    fnError("Can not fetch feedbacks");
    return FeedbackService.getFeedbackInfo(id);
  }

  /**
   * getFeedbackExtendedInfo
   */
  @GET("api/feedbacks/:id/extended")
  public getFeedbackExtendedInfo({ query, fnMessage, fnError }) {
    const id = query["id"] as string;
    const { FeedbackService } = this.di;
    fnMessage("feedback extended info fetched success");
    fnError("Can not fetch feedback extended info");
    return FeedbackService.getFeedbackExtendedInfo(id);
  }

  /**
   * addFeedback
   */
  @USE([session])
  @USE(
    validate({
      type: "object",
      properties: {
        user_id: { type: "number" },
        product_id: { type: "number" },
        rating: { type: "number" },
        message: { type: "string" },
      },
      required: ["product_id", "rating", "message"],
      additionalProperties: false,
    })
  )
  @POST("api/feedbacks/add")
  public addFeedback({ query, user, session, fnMessage, fnError }) {
    const body = query;
    let bodyString = JSON.stringify(body);
    let data = JSON.parse(bodyString) as IFeedbackPostData;

    if (session["passport"] && session["passport"]["user"]) {
      data["userId"] = parseInt(session["passport"]["user"]);
    }

    if( data["userId"] == -1) {
      fnError("You must be logined to add feedback", "TOAST");
      throw Error("You must be logined to add feedback");
    }

    const { FeedbackService } = this.di;
    fnMessage("feedback added success");
    fnError("Can not add feedback");
    return FeedbackService.addFeedback(data);
  }
}
