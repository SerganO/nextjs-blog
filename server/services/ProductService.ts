import { Op, FindOptions } from "sequelize";
import BaseContext from "server/di/BaseContext";
import { IPagerParams } from "src/pagination/IPagerParams ";

export default class ProductService extends BaseContext {
  /**
   * addFeedbackToProduct
   */
  public async addFeedbackToProduct(
    data: IFeedbackPostData
  ) {
    const { FeedbackService } = this.di;

    await FeedbackService.addFeedback(data);
    return this.findProductExtendedInfo(`${data.productId}`);
  }

  /**
   * getAllProductsInfo
   */
  public getAllProductsInfo(userId: number) {
    const { Product } = this.di;

    const queryOptions: FindOptions = {};

    if (userId !== null && userId !== undefined && !isNaN(userId)) {
      queryOptions.where = {
        ...queryOptions.where,
        user_id: { [Op.eq]: userId },
      };
    }

    return Product.findAll(queryOptions);
  }

  /**
   * findProductsFeedbackIndludedFirstSet
   */
  public findProductsFeedbackIndludedFirstSet() {
    const queryOptions: FindOptions = {};

    queryOptions.offset = 0;
    queryOptions.limit = 20;

    const { Product, Feedback } = this.di;

    queryOptions.include = { model: Feedback, as: "feedbacks" };

    return Product.findAll(queryOptions);
  }

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

    const { Product, Feedback } = this.di;

    queryOptions.include = { model: Feedback, as: "feedbacks" };

    return Product.findAll(queryOptions);
  }

  /**
   * page
   */
  public page(params: IPagerParams) {
    const limit = params.perPage;
    const offset = (params.page - 1) * params.perPage;

    const queryOptions: FindOptions = {};
    const countQueryOptions: FindOptions = {};

    if (params.filter) {
      Object.keys(params.filter).forEach((key) => {
        queryOptions.where = {
          ...queryOptions.where,
          [key]: { [Op.eq]: params.filter[key] },
        };

        countQueryOptions.where = {
          ...queryOptions.where,
          [key]: { [Op.eq]: params.filter[key] },
        };
      });
    }
    if (offset) {
      queryOptions.offset = offset;
    }

    if (limit) {
      queryOptions.limit = limit;
    }

    const { Product, Feedback } = this.di;

    queryOptions.include = { model: Feedback, as: "feedbacks" };

    return new Promise(async (resolve, reject) => {
      try {
        let count = params.count ?? 0;
        if (count == 0) {
          count = await Product.count(countQueryOptions);
        }
        const products = await Product.findAll(queryOptions);
        let response = {
          items: products,
          count,
        };
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }) as Promise<any>;
  }

  /**
   * findProductExtendedInfo
   */
  public findProductExtendedInfo(productId: string) {
    const { Product, Feedback, User } = this.di;

    return Product.findByPk(productId, {
      include: [
        { model: User, as: "vendor" },
        {
          model: Feedback,
          as: "feedbacks",
          include: [{ model: User, as: "author" }],
        },
      ],
    });
  }

  /**
   * getProductFeedbacksIncluded
   */
  public getProductFeedbacksIncluded(id: number) {
    const { Product, Feedback, User } = this.di;

    return Product.findByPk(id, {
      include: {
        model: Feedback,
        as: "feedbacks",
        include: [{ model: User, as: "author" }],
      },
    });
  }

  /**
   * getProductVendorIncluded
   */
  public getProductVendorIncluded(id: number) {
    const { Product, User } = this.di;
    return Product.findByPk(id, { include: { model: User, as: "vendor" } });
  }

  /**
   * getProductBaseInfo
   */
  public getProductBaseInfo(id: number) {
    const { Product } = this.di;
    return Product.findByPk(id);
  }

  /**
   * addProduct
   */
  public addProduct(data: IProductPostData ) {
    const { Product } = this.di;

    return Product.create({...data});
  }
}
