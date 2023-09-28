import { NextApiRequest, NextApiResponse } from "next";
import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer";
import BaseController from "./BaseController";
import { GET, POST, SSR, USE } from "server/decorators";
import validate, { validateProps } from "server/middleware/validate";
import session from "server/middleware/session";
import pager from "server/decorators/pager";
import entity from "server/decorators/entity";
import { IPagerParams } from "src/pagination/IPagerParams ";

/*@USE(async (req, res, next) => {
  console.log("class use 1");
  return await next();
})
@USE([
  async (req, res, next) => {
    console.log("class use 2, req:", req.query ?? req.params);
    return await next();
  },
  async (req, res, next) => {
    console.log("class use 3, req:", req.query ?? req.params);
    return await next();
  },
  async (req, res, next) => {
    console.log("class use 4, req:", req.query ?? req.params);
    return await next();
  },
])*/

@entity("ProductEntity")
export default class ProductController extends BaseController {
  /**
   * getAllProducts
   */
  /*@USE((req, res, next) => {
    console.log("method use 1");
    next();
  })
  @USE([
    (req, res, next) => {
      console.log("method use 2, req:", req.query);
      next();
    },
    (req, res, next) => {
      console.log("method use 3, req:", req.query);
      next();
    },
    (req, res, next) => {
      console.log("method use 4, req:", req.query);
      next();
    },
  ])*/
  @GET("api/products")
  public getAllProducts({ query, fnMessage, fnError }) {
    const { ProductService } = this.di;
    const userId = parseInt(query["user"]);
    fnMessage("products info fetched success");
    fnError("Can not fetch products info");

    return ProductService.getAllProductsInfo(userId);
  }

  /**
   * getProductBaseInfo
   */
  @USE(
    validate({
      type: "object",
      properties: {
        id: validateProps.queryId,
      },
      required: ["id"],
      additionalProperties: false,
    })
  )
  @GET("api/products/:id")
  public getProductBaseInfo({ query, fnMessage, fnError }) {
    const id = parseInt(query.id as string);

    const { ProductService } = this.di;
    fnMessage("product info fetched success");
    fnError("Can not fetch product info");
    return ProductService.getProductBaseInfo(id);
  }

  /**
   * findProductExtendedInfo
   */
  @USE(async (req, res, next) => {
    console.log("method extended use 1");
    return await next();
  })
  @USE(
    validate({
      type: "object",
      properties: {
        id: validateProps.queryId,
      },
      required: ["id"],
      additionalProperties: false,
    })
  )
  @GET("api/products/:id/extended")
  @SSR("products/:id")
  public findProductExtendedInfo({ query, fnMessage, fnError }) {
    console.log("findProductExtendedInfo in");
    console.log("query[id]: ", query["id"]);
    const id = query["id"] as string;
    const { ProductService } = this.di;
    fnMessage("product extended info fetched success");
    fnError("Can not fetch product extended info");
    return ProductService.findProductExtendedInfo(id);
  }

  /**
   * findProductsFeedbackIncluded
   */
  @GET("api/products/feedbacksIncluded")
  public findProductsFeedbackIncluded({ query, fnMessage, fnError }) {
    const userId = query["user"] as string;

    const limit = parseInt(query["l"] as string);
    const offset = parseInt(query["o"] as string);
    const { ProductService } = this.di;
    fnMessage("product info fetched success");
    fnError("Can not fetch product info");
    return ProductService.findProductsFeedbackIndluded(userId, offset, limit);
  }

  /**
   * addFeedback
   */
  @USE([session])
  @USE(
    validate({
      type: "object",
      properties: {
        id: validateProps.queryId,
        user_id: { type: "number" },
        product_id: { type: "number" },
        rating: { type: "number" },
        message: { type: "string" },
      },
      required: ["product_id", "rating", "message"],
      additionalProperties: false,
    })
  )
  @POST("api/products/:id/addFeedback")
  public addFeedback({ query, user, session, fnMessage, fnError }) {
    const body = query;
    console.log("controller add feedback ");
    console.log("c addf user: ", user);
    console.log("c addf session: ", session);
    //console.log("c addf session user: ", session["passport"]["user"]);
    let bodyString = JSON.stringify(body);
    let bodyData = JSON.parse(bodyString);

    let userId: number = parseInt(bodyData["user_id"] as string);
    if (session["passport"] && session["passport"]["user"]) {
      userId = parseInt(session["passport"]["user"]);
    }

    const productId: number = parseInt(bodyData["product_id"] as string);
    const rating: number = parseInt(bodyData["rating"] as string);
    const message: string = bodyData["message"] as string;

    if (userId && productId && rating && message) {
      const { ProductService } = this.di;
      fnMessage("feedback added success");
      fnError("Can not add feedback");
      return ProductService.addFeedbackToProduct(
        userId,
        productId,
        rating,
        message
      );
    } else {
      throw Error("Can not add product: not full data");
    }
  }

  @pager()
  @SSR("products/index")
  async getProductsPaginatedSSR({ fnMessage, fnError }) {
    const { ProductService } = this.di;
    const pager: IPagerParams = {
      perPage: 20,
      pageName: "products",
      entityName: "products",
      page: 1,
    };
    console.log("pager: ", pager);
    fnMessage("product page fetched success");
    fnError("Can not fetch product page info");
    return ProductService.page(pager);
  }

  @pager()
  @POST("api/products/pagination")
  async getProductsPaginated({ pager, fnMessage, fnError }) {
    const { ProductService } = this.di;
    console.log("pager: ", pager);
    fnMessage("product page fetched success");
    fnError("Can not fetch product page info");
    return ProductService.page(pager);
  }

  /**
   * getProductFeedbacksIncludedFirstSet
   */
  @USE((req, res, next) => {
    console.log("method use 1");
    return next();
  })
  @GET("api/products/feedbacksIncluded/firstSet")
  @SSR("index")
  public getProductFeedbacksIncludedFirstSet({ query, fnMessage, fnError }) {
    console.log("getProductFeedbacksIncludedFirstSet in");
    const { ProductService } = this.di;
    fnMessage("products info fetched success");
    fnError("Can not fetch products info");
    return ProductService.findProductsFeedbackIndludedFirstSet();
  }

  /**
   * getProductFeedbacksIncluded
   */
  @USE(
    validate({
      type: "object",
      properties: {
        id: validateProps.queryId,
      },
      required: ["id"],
      additionalProperties: false,
    })
  )
  @GET("api/products/:id/feedbacks")
  public getProductFeedbacksIncluded({ query, fnMessage, fnError }) {
    const id = parseInt(query.id as string);

    const { ProductService } = this.di;
    fnMessage("product extended info fetched success");
    fnError("Can not fetch product extended info");
    return ProductService.getProductFeedbacksIncluded(id);
  }

  /**
   * getProductVendorIncluded
   */
  @USE(
    validate({
      type: "object",
      properties: {
        id: validateProps.queryId,
      },
      required: ["id"],
      additionalProperties: false,
    })
  )
  @GET("api/products/:id/vendor")
  public getProductVendorIncluded({ query, fnMessage, fnError }) {
    const id = parseInt(query.id as string);

    const { ProductService } = this.di;

    fnMessage("product extended info fetched success");
    fnError("Can not fetch product extended info");
    return ProductService.getProductVendorIncluded(id);
  }

  /**
   * addProduct
   */
  @USE(
    validate({
      type: "object",
      properties: {
        user_id: validateProps.id,
        title: { type: "string" },
        description: { type: "string" },
        SKU: { type: "string" },
        category: { type: "string" },
        price: { type: "number", minimum: 0.0 },
      },
      required: ["user_id", "title", "description", "SKU", "category", "price"],
      additionalProperties: false,
    })
  )
  @POST("api/products/")
  public addProduct({ query, fnMessage, fnError }) {
    const body = query;
    let bodyString = JSON.stringify(body);
    let bodyData = JSON.parse(bodyString);

    const userID: number = parseInt(bodyData["user_id"] as string);
    const title: string = bodyData["title"] as string;
    const description: string = bodyData["description"] as string;
    const SKU: string = bodyData["SKU"] as string;
    const category: string = bodyData["category"] as string;
    const price: number = parseFloat(bodyData["price"] as string);

    if (userID && title && description && SKU && category && price) {
      const { ProductService } = this.di;
      fnMessage("product added success");
      fnError("Can not add product");
      return ProductService.addProduct(
        userID,
        title,
        description,
        category,
        SKU,
        price
      );
    } else {
      throw Error("Can not add product: not full data");
    }
  }
}
