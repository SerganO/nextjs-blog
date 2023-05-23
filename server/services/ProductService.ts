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

    queryOptions.raw = true;
    queryOptions.nest = true;

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

    queryOptions.raw = true;
    queryOptions.nest = true;

    queryOptions.include = { model: Feedback, as: "feedbacks" };

    const fetchData = async () => {
      await Product.count(countQueryOptions).then(async (count) => {
        await Product.findAll(queryOptions).then(async (products) => {
          if (userId !== null && userId !== undefined) {
            await User.findByPk(parseInt(userId as string)).then((user) => {
              return { count: count, products: products, vendor: user };
            });
          } else {
            return { count: count, products: products };
          }
        });
      });
    };

    return fetchData();
  }
}

const productService = new ProductService();

export default productService;
