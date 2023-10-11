import BaseController from "./BaseController";
import { GET, POST, SSR, USE } from "server/decorators";
import validate, { validateProps } from "server/middleware/validate";
import session from "server/middleware/session";
import pager from "server/decorators/pager";
import entity from "server/decorators/entity";
import { IPagerParams } from "src/pagination/IPagerParams ";

@entity("ProductEntity")
export default class ProductController extends BaseController {
  /**
   * getAllProducts
   */
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
        userId: { type: "number" },
        productId: { type: "number" },
        rating: { type: "number" },
        message: { type: "string" },
      },
      required: ["productId", "rating", "message"],
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
    let data = JSON.parse(bodyString) as IFeedbackPostData;

    if (session["passport"] && session["passport"]["user"]) {
      data["userId"] = parseInt(session["passport"]["user"]);
    }

    if( data["userId"] == -1) {
      fnError("You must be logined to add feedback", "TOAST");
      throw Error("You must be logined to add feedback");
    }

      const { ProductService } = this.di;
      fnMessage("feedback added success", "TOAST");
      fnError("Can not add feedback", "TOAST");
      return ProductService.addFeedbackToProduct(data);
  }

  @pager()
  @SSR("products/index")
  async getProductsPaginatedSSR({query, pager, fnMessage, fnError }) {
    const { ProductService } = this.di;
    const filter = {};
    if (query.user) {
      filter["user_id"] = query.user;
    }
    pager.filter = filter;
    pager.perPage = 20;
    pager.entityName = "products";
    pager.pageName = "products";
    pager.sort = {};
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
        userId: validateProps.id,
        title: { type: "string" },
        description: { type: "string" },
        SKU: { type: "string" },
        category: { type: "string" },
        price: { type: "number", minimum: 0.0 },
      },
      required: ["userId", "title", "description", "SKU", "category", "price"],
      additionalProperties: false,
    })
  )
  @POST("api/products/add")
  public addProduct({ query, fnMessage, fnError }) {
    const body = query;
    let bodyString = JSON.stringify(body);
    let data = JSON.parse(bodyString) as IProductPostData;

  
      const { ProductService } = this.di;
      fnMessage("product added success");
      fnError("Can not add product");
      return ProductService.addProduct(data);
    
  }
}
