import { Op, FindOptions } from "sequelize";
import BaseContext from "server/di/BaseContext";

export default class FeedbackService extends BaseContext {
  /**
   * getAllFeedbacksInfo
   */
  public getAllFeedbacksInfo(userId: number, productId: number) {
    const { Feedback } = this.di;

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
  public addFeedback(data: IFeedbackPostData) {
    console.log("service add feedback ");
    const { Feedback } = this.di;

    return Feedback.create({
      ...data,
    });
  }
}
