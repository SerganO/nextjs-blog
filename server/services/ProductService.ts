import Product from "server/models/Product";
import Feedback from "server/models/Feedback";
import User from "server/models/User";
import { Op, FindOptions } from "sequelize";

class ProductService {
  /**
   * findProductsFeedbackIndluded
   */
  public findProductsFeedbackIndluded(
    userId: string = null,
    offset: number = null,
    limit: number = null
  ) {
    const queryOptions: FindOptions = {};

    if (userId !== null && userId !== undefined) {
      queryOptions.where = {
        ...queryOptions.where,
        user_id: { [Op.eq]: userId },
      };
    }

    if (offset) {
      queryOptions.offset = offset;
    }

    if (limit) {
      queryOptions.limit = limit;
    }

    /*queryOptions.raw = true;
    queryOptions.nest = true;*/

    queryOptions.include = { model: Feedback, as: "feedbacks" };

    return Product.findAll(queryOptions);
  }

    /**
   * findProductsPaginated
   */
  public findProductsPaginated(
    userId: string = null,
    offset: number = null,
    limit: number = null
  ) {
    const queryOptions: FindOptions = {};
    const countQueryOptions: FindOptions = {};

    console.log("parameters: ", userId, offset, limit);

    if (userId !== null && userId !== undefined) {
      queryOptions.where = {
        ...queryOptions.where,
        user_id: { [Op.eq]: userId },
      };

      countQueryOptions.where = {
        ...countQueryOptions.where,
        user_id: { [Op.eq]: userId },
      };
    }

    if (offset) {
      queryOptions.offset = offset;
    }

    if (limit) {
      queryOptions.limit = limit;
    }

    /*queryOptions.raw = true;
queryOptions.nest = true;*/

    queryOptions.include = { model: Feedback, as: "feedbacks" };

    return new Promise(async (resolve, reject) => {
      try {
        const count = await Product.count(countQueryOptions);
        const products = await Product.findAll(queryOptions);

        let response = { count, products, vendor: null };

        if (userId !== null && userId !== undefined) {
          const user = await User.findByPk(parseInt(userId as string));
          response.vendor = user;
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * findProductExtendedInfo
   */
  public findProductExtendedInfo(productId: string) {
    return Product.findByPk(productId, {
      include: [
        { model: User, as: "vendor" },
        {
          model: Feedback,
          as: "feedbacks",
          include: [{ model: User, as: "author" }],
        },
      ],
    })
  }
}

const productService = new ProductService();

export default productService;
