//import Product from "server/models/Product";
//import Feedback from "server/models/Feedback";
//import User from "server/models/User";
import { Op, FindOptions } from "sequelize";
import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer";
import { IPagerParams } from "src/pagination/IPagerParams ";

export default class ProductService extends BaseContext {
  constructor(opts: IContextContainer) {
    super(opts);
    this.di = opts;
    console.log("ProductService init: ", this);
    console.log("di: ", this.di);
  }

  /**
   * addFeedbackToProduct
   */
  public addFeedbackToProduct(
    userId: number,
    productId: number,
    rating: number,
    message: string
  ) {
    const { FeedbackService } = this.di;

    return new Promise(async (resolve, reject) => {
      try {
        await FeedbackService.addFeedback(userId, productId, rating, message);
        const response = await this.findProductExtendedInfo(`${productId}`);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
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
    console.log("params: ", params);
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

    const { Product, Feedback, User } = this.di;

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
          //PAGINATION PARAMS
          //page: params.page,
          //pageName: params.pageName,
          //perPage: params.perPage,
          //entityName: params.entityName,
        };
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }) as Promise<any>;
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
    console.log("Product service dI:", this.di);
    console.log("Product service dI us:", this.di.UserService);
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

    const { Product, Feedback, User } = this.di;

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
  public addProduct(
    userId: number,
    title: string,
    description: string,
    SKU: string,
    category: string,
    price: number
  ) {
    const { Product } = this.di;

    return Product.create({
      userId: userId,
      title: title,
      description: description,
      SKU: SKU,
      category: category,
      price: price,
    });
  }
}

/*const productService = new ProductService();

export default productService;*/
