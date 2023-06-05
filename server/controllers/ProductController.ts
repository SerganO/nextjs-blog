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

    this.findProductsPaginated = this.findProductsPaginated.bind(this);
    this.findProductExtendedInfo = this.findProductExtendedInfo.bind(this);
    this.findProductsFeedbackIncluded =
      this.findProductsFeedbackIncluded.bind(this);

    this.getServerSidePaginated = this.getServerSidePaginated.bind(this);
    this.getServerSidePropsMainPage =
      this.getServerSidePropsMainPage.bind(this);
    this.getServerSideProduct = this.getServerSideProduct.bind(this);
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
  public findProductsFeedbackIncluded(query: any
  ) {
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
    const limit = parseInt(query["l"] as string);
    const offset = parseInt(query["o"] as string);

    const { ProductService } = this.di;
    console.log("call element: ", this);
    console.log("findProductsPaginated dI: ", this.di);
    return ProductService.findProductsPaginated(userId, offset, limit);
  };

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

  /**
   * getServerSidePropsMainPage
   */
  public async getServerSidePropsMainPage(context) {
    var offset = 0;
    var limit = 20;

    const { ProductService } = this.di;

    let products = await ProductService.findProductsFeedbackIndluded(
      null,
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

  /**
   * getServerSidePaginated
   */
  public async getServerSidePaginated(context) {
    let page = 1;
    if (context.query.page) {
      page = parseInt(context.query.page);
    }

    const userId = context.query.user;
    console.log("userId: ", userId);
    const offset = (page - 1) * 20;
    const limit = 20;
    const { ProductService } = this.di;
    let pageData = await ProductService.findProductsPaginated(
      userId,
      offset,
      limit
    );

    pageData = JSON.parse(JSON.stringify(pageData));

    return {
      props: {
        data: pageData,
      },
    };
  }

  /**
   * getServerSideProduct
   */
  public async getServerSideProduct(context) {
    const id = context.params.id;
    const { ProductService } = this.di;
    let product = await ProductService.findProductExtendedInfo(id);
    product = JSON.parse(JSON.stringify(product));
    return {
      props: {
        product,
      },
    };
  }
}

/*const productController = new ProductController();

export default productController;*/
