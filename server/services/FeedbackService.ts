import { Op, FindOptions } from "sequelize";
import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer";

export default class FeedbackService extends BaseContext {
  constructor(opts: IContextContainer) {
    super(opts);
    this.di = opts;
    console.log("FeedbackService init: ", this);
    console.log("di: ", this.di);
  }

  /**
   * getAllFeedbacksInfo
   */
  public getAllFeedbacksInfo(userId: number, productId: number) {
    const { Feedback } = this.di;

    console.log("userId: ", userId)
    console.log("productId: ", productId)


    const queryOptions: FindOptions = {};
  
    if (userId !== null && userId !== undefined && !isNaN(userId)) {
      queryOptions.where = {
        ...queryOptions.where,
        user_id: { [Op.eq]: userId },
      };
    }
  
    if (productId !== null && productId !== undefined && !isNaN(productId)) {
      queryOptions.where = {
        ...queryOptions.where,
        product_id: { [Op.eq]: productId },
      };
    }
    return Feedback.findAll(queryOptions);
  }

  /**
   * getFeedbackInfo
   */
  public getFeedbackInfo(id: string) {
    const { Feedback } = this.di;

    return Feedback.findByPk(id);
  }

  /**
   * getFeedbackExtendedInfo
   */
  public getFeedbackExtendedInfo(id: string) {
    const { User, Product, Feedback } = this.di;

    return Feedback.findByPk(id, {
      include: [
        { model: User, as: "author" },
        { model: Product, as: "product" },
      ],
    });
  }

  /**
   * addFeedback
   */
  public addFeedback(
    userId: number,
    productId: number,
    rating: number,
    message: string
  ) {
    console.log("service add feedback ");
    const { Feedback } = this.di;

    return Feedback.create({
      userId: userId,
      productId: productId,
      rating: rating,
      message: message,
    });
  }
}
