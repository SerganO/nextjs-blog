import { NextApiRequest, NextApiResponse } from "next";
import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer";
import BaseController from "./BaseController";
import {GET, POST, SSR, USE} from "server/decorators";
import validate, {validateProps} from "server/middleware/validate";


@USE((req, res, next) => {
  console.log("class use 1")
  next()
})
@USE([(req, res, next) => {
  console.log("class use 2, req:",  req.query)
  next();
}, (req, res, next) => {
  console.log("class use 3, req:",  req.query)
  next();
},
(req, res, next) => {
  console.log("class use 4, req:",  req.query)
  next();
}])
export default class ProductController extends BaseController {
  /**
   * getAllProducts
   */
 @USE((req, res, next) => {
  console.log("method use 1")
  next();
 })
 @USE([(req, res, next) => {
  console.log("method use 2, req:",  req.query)
  next();
}, (req, res, next) => {
  console.log("method use 3, req:",  req.query)
  next();
},
(req, res, next) => {
  console.log("method use 4, req:",  req.query)
  next();
}])
  @GET("api/products")
  public getAllProducts(query: any) {
    const { ProductService } = this.di;
    const userId = parseInt(query["user"]);
    return ProductService.getAllProductsInfo(userId);
  }

  /**
   * getProductBaseInfo
   */
  @USE(validate({
    type: 'object',
    properties: {
      id: validateProps.queryId,
    },
    required: ['id'],
    additionalProperties: false,
  }))
  @GET("api/products/[id]")
  public getProductBaseInfo(query: any) {
    const id = parseInt(query.id as string);

    const { ProductService } = this.di;
    return ProductService.getProductBaseInfo(id);
  }

  /**
   * findProductExtendedInfo
   */
  @USE(validate({
    type: 'object',
    properties: {
      id: validateProps.queryId,
    },
    required: ['id'],
    additionalProperties: false,
  }))
  @GET("api/products/[id]/extended")
  @SSR("products/[id]")
  public findProductExtendedInfo(query: any) {
    console.log("in")
    const id = query["id"] as string;
    const { ProductService } = this.di;
    return ProductService.findProductExtendedInfo(id);
  }

  /**
   * findProductsFeedbackIncluded
   */
  @GET("api/products/feedbacksIncluded")
  public findProductsFeedbackIncluded(query: any) {
    const userId = query["user"] as string;

    const limit = parseInt(query["l"] as string);
    const offset = parseInt(query["o"] as string);
    const { ProductService } = this.di;
    return ProductService.findProductsFeedbackIndluded(userId, offset, limit);
  }

  /**
   * findProductsPaginated
   */
  @GET("api/products/pagination")
  @SSR("products/index")
  public findProductsPaginated = (query: any) => {
    // public findProductsPaginated(req: NextApiRequest, res: NextApiResponse) {

    const userId = query["user"] as string;
    const page = parseInt(query["page"] as string);

    const offset = (page - 1) * 20;
    const limit = 20;

    const { ProductService } = this.di;
    console.log("call element: ", this);
    console.log("findProductsPaginated dI: ", this.di);
    return ProductService.findProductsPaginated(userId, offset, limit);
  };

  /**
   * getProductFeedbacksIncludedFirstSet
   */
  @GET("api/products/feedbacksIncluded/firstSet")
  @SSR("index")
  public getProductFeedbacksIncludedFirstSet(query: any) {
    console.log("getProductFeedbacksIncludedFirstSet in");
    const { ProductService } = this.di;

    return ProductService.findProductsFeedbackIndludedFirstSet();
  }

  /**
   * getProductFeedbacksIncluded
   */
  @USE(validate({
    type: 'object',
    properties: {
      id: validateProps.queryId,
    },
    required: ['id'],
    additionalProperties: false,
  }))
  @GET("api/products/[id]/feedbacks")
  public getProductFeedbacksIncluded(query: any) {
    const id = parseInt(query.id as string);

    const { ProductService } = this.di;

    return ProductService.getProductFeedbacksIncluded(id);
  }

  /**
   * getProductVendorIncluded
   */
  @USE(validate({
    type: 'object',
    properties: {
      id: validateProps.queryId,
    },
    required: ['id'],
    additionalProperties: false,
  }))
  @GET("api/products/[id]/vendor")
  public getProductVendorIncluded(query: any) {
    const id = parseInt(query.id as string);

    const { ProductService } = this.di;

    return ProductService.getProductVendorIncluded(id);
  }

  /**
   * addProduct
   */
  @USE(
    validate({
      type: 'object',
      properties: {
        user_id: validateProps.id,
        title: {type: "string"},
        description: {type: "string"},
        SKU: {type: "string"},
        category: {type: "string"},
        price: {type: "number", minimum: 0.00},
      },
      required: ['user_id', 'title','description','SKU','category', 'price'],
      additionalProperties: false,
    })
  )
  @POST("api/products/")
  public addProduct(body: any) {
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
      return ProductService.addProduct(
        userID,
        title,
        description,
        category,
        SKU,
        price
      );
    } else {
      throw Error("not full data");
    }
  }
}

/*const productController = new ProductController();

export default productController;*/
