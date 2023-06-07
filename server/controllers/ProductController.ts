import { NextApiRequest, NextApiResponse } from "next";
import BaseContext from "server/di/BaseContext";
//import container from "server/di/container";
import IContextContainer from "server/di/interfaces/IContextContainer";
import BaseController from "./BaseController";
import { RequestType } from "./BaseController";

export default class ProductController extends BaseController {
  constructor(opts: IContextContainer) {
    super(opts);
    console.log("ProductController init: ", this);
    console.log("di: ", this.di);

    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProductBaseInfo = this.getProductBaseInfo.bind(this);
    this.findProductsPaginated = this.findProductsPaginated.bind(this);
    this.findProductExtendedInfo = this.findProductExtendedInfo.bind(this);
    this.findProductsFeedbackIncluded =
      this.findProductsFeedbackIncluded.bind(this);
    this.getProductFeedbacksIncludedFirstSet =
      this.getProductFeedbacksIncludedFirstSet.bind(this);

    this.getProductFeedbacksIncluded =
      this.getProductFeedbacksIncluded.bind(this);
    this.getProductVendorIncluded = this.getProductVendorIncluded.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  /**
   * getAllProducts
   */
  public getAllProducts(query: any) {
    const { ProductService } = this.di;
    const userId = parseInt(query["user"]);
    return ProductService.getAllProductsInfo(userId);
  }

  /**
   * getProductBaseInfo
   */
  public getProductBaseInfo(query: any) {
    const id = parseInt(query.id as string);

    const { ProductService } = this.di;
    return ProductService.getProductBaseInfo(id);
  }

  /**
   * findProductExtendedInfo
   */
  public findProductExtendedInfo(query: any) {
    const id = query["id"] as string;
    const { ProductService } = this.di;
    return ProductService.findProductExtendedInfo(id);
  }

  /**
   * findProductsFeedbackIncluded
   */
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
  public getProductFeedbacksIncludedFirstSet(query: any) {
    const { ProductService } = this.di;

    return ProductService.findProductsFeedbackIndludedFirstSet();
  }

  /**
   * getProductFeedbacksIncluded
   */
  public getProductFeedbacksIncluded(query: any) {
    const id = parseInt(query.id as string);

    const { ProductService } = this.di;

    return ProductService.getProductFeedbacksIncluded(id);
  }

  /**
   * getProductVendorIncluded
   */
  public getProductVendorIncluded(query: any) {
    const id = parseInt(query.id as string);

    const { ProductService } = this.di;

    return ProductService.getProductVendorIncluded(id);
  }

  /**
   * addProduct
   */
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

  /**
   * getServerSidePropsFeedbackIncluded
   */
  public async getServerSidePropsFeedbackIncluded(context) {
    const userId = context.query.user as string;
    var offset = null;
    var limit = null;
    if (context.query.o) {
      offset = parseInt(context.query.o as string);
    }

    if (context.query.l) {
      limit = parseInt(context.query.l as string);
    }

    const { ProductService } = this.di;

    let products = await ProductService.findProductsFeedbackIndluded(
      userId,
      offset,
      limit
    );
    products = JSON.parse(JSON.stringify(products));
    return {
      props: {
        products,
      },
    };
  }
}

/*const productController = new ProductController();

export default productController;*/
