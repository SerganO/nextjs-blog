import { NextApiRequest, NextApiResponse } from "next";
import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer";
import BaseController from "./BaseController";
import { GET, POST, SSR, USE } from "server/decorators";
import validate, { validateProps } from "server/middleware/validate";
import session from "server/middleware/session";
import pager from "server/decorators/pager";

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
export default class ProductController extends BaseController {
  constructor(opts: IContextContainer) {
    super(opts);
    this.entity = "ProductEntity";
  }

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
  public getAllProducts(query: any) {
    const { ProductService } = this.di;
    const userId = parseInt(query["user"]);
    return ProductService.getAllProductsInfo(userId)
      .then((res) => {
        return this.answer(res, "products info fetched success");
        // return {
        //   data: res,
        //   message: "products info fetched success"
        // }
      })
      .catch((error) => {
        console.error("ProductController.getAllProducts()", error);
        return this.error("Can not fetch products info");
        // return {
        //   data: null,
        //   message: "Can not fetch products info"
        // }
      });
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
  public getProductBaseInfo(query: any) {
    const id = parseInt(query.id as string);

    const { ProductService } = this.di;
    return ProductService.getProductBaseInfo(id)
      .then((res) => {
        return this.answer(res, "product info fetched success");
        // return {
        //   data: res,
        //   message: "product info fetched success"
        // }
      })
      .catch((error) => {
        console.error("ProductController.getProductBaseInfo()", error);
        return this.error("Can not fetch product info");
        // return {
        //   data: null,
        //   message: "Can not fetch product info"
        // }
      });
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
  public findProductExtendedInfo(query: any) {
    console.log("findProductExtendedInfo in");
    console.log("query[id]: ", query["id"]);
    const id = query["id"] as string;
    const { ProductService } = this.di;
    return ProductService.findProductExtendedInfo(id)
      .then((res) => {
        return this.answer(res, "product extended info fetched success");
        // return {
        //   data: res,
        //   message: "product extended info fetched success"
        // }
      })
      .catch((error) => {
        console.error("ProductController.findProductExtendedInfo()", error);
        return this.error("Can not fetch product extended info");
        // return {
        //   data: null,
        //   message: "Can not fetch product extended info"
        // }
      });
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
    return ProductService.findProductsFeedbackIndluded(userId, offset, limit)
      .then((res) => {
        return this.answer(res, "product info fetched success");
        // return {
        //   data: res,
        //   message: "products info fetched success"
        // }
      })
      .catch((error) => {
        console.error(
          "ProductController.findProductsFeedbackIncluded()",
          error
        );
        return this.error("Can not fetch product info");
        // return {
        //   data: null,
        //   message: "Can not fetch products info"
        // }
      });
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
  public addFeedback(body: any, user, session) {
    console.log("controller add feedback ");
    console.log("c addf user: ", user);
    console.log("c addf session: ", session);
    console.log("c addf session user: ", session["passport"]["user"]);
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
      return ProductService.addFeedbackToProduct(
        userId,
        productId,
        rating,
        message
      )
        .then((res) => {
          return this.answer(res, "product added success");
          // return {
          //   data: res,
          //   message: "product added success"
          // }
        })
        .catch((error) => {
          console.error("ProductController.addFeedback()", error);
          return this.error("Can not add product info");
          // return {
          //   data: null,
          //   message: "Can not add product"
          // }
        });
    } else {
      //const { FeedbackService } = this.di;
      //return FeedbackService.addFeedback(userId, productId, rating, message);

      throw Error("Can not add product: not full data");
    }
  }

  @pager()
  //@SSR("products/index")
  async getProductsPaginatedSSR(query, pager) {
    const { ProductService } = this.di;
    console.log("SSR query: ", query);
    console.log("SSR pager: ", pager);
    const filter = {};
    if (query.user) {
      filter["user_id"] = query.user;
    }
    pager.filter = filter;
    pager.perPage = 20;
    pager.entityName = "products";
    pager.pageName = "products";
    pager.sort = {};
    return ProductService.page(pager)
      .then((res) => {
        return this.extendedAnswer(res, "product page fetched success");
      })
      .catch((error) => {
        console.error("ProductController.getProductsPaginated()", error);
        return this.error("Can not fetch product page info");
      });
  }

  @pager()
  @POST("api/products/pagination")
  @SSR("products/index")
  async getProductsPaginated(pager) {
    const { ProductService } = this.di;
    console.log("pager: ", pager);
    return ProductService.page(pager)
      .then((res) => {
        return this.extendedAnswer(res, "product page fetched success");
        // return {
        //   data: res,
        //   message: "page fetched success"
        // }
      })
      .catch((error) => {
        console.error("ProductController.getProductsPaginated()", error);
        return this.error("Can not fetch product page info");
        // return {
        //   data: null,
        //   message: "Can not fetch product page info"
        // }
      });
  }

  /**
   * findProductsPaginated
   */
  /*@USE((req, res, next) => {
    console.log("method extended use 1");
    return next();
  })*/
  //@SSR("products/index")
  public findProductsPaginated = (query: any) => {
    // public findProductsPaginated(req: NextApiRequest, res: NextApiResponse) {

    const userId = query["user"] as string;
    const page = parseInt(query["page"] as string) || 1;

    const offset = (page - 1) * 20;
    const limit = 20;

    const { ProductService } = this.di;
    console.log("call element: ", this);
    console.log("findProductsPaginated dI: ", this.di);
    return ProductService.findProductsPaginated(userId, offset, limit).then(
      (res) => {
        const result: any = res;
        let filters = {};
        if (result.vendor) {
          filters["vendor"] = result.vendor;
        }
        return this.extendedAnswer(
          {
            items: result.products,
            count: result.count,
          },
          ""
        ); /*{
          page: page,
          count: result.count,
          objectTypes: "products",
          objects: result.products,
          products: result.products,
          vendor: result.vendor,
          filters,
        };*/
      }
    );
  };

  /**
   * getProductFeedbacksIncludedFirstSet
   */
  @USE((req, res, next) => {
    console.log("method use 1");
    return next();
  })
  @GET("api/products/feedbacksIncluded/firstSet")
  @SSR("index")
  public getProductFeedbacksIncludedFirstSet(query: any) {
    console.log("getProductFeedbacksIncludedFirstSet in");
    const { ProductService } = this.di;

    return ProductService.findProductsFeedbackIndludedFirstSet()
      .then((res) => {
        return this.answer(res, "products info fetched success");
        // return {
        //   data: res,
        //   message: "products info fetched success"
        // }
      })
      .catch((error) => {
        console.error(
          "ProductController.getProductFeedbacksIncludedFirstSet()",
          error
        );
        return this.error("Can not fetch products info");
        // return {
        //   data: null,
        //   message: "Can not fetch products info"
        // }
      });

    /*return new Promise(async (resolve, reject) => {
      try {
        const products =
          await ProductService.findProductsFeedbackIndludedFirstSet();
        //let response = { products};
        resolve(products);
      } catch (error) {
        reject(error);
      }
    });*/
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
  public getProductFeedbacksIncluded(query: any) {
    const id = parseInt(query.id as string);

    const { ProductService } = this.di;

    return ProductService.getProductFeedbacksIncluded(id)
      .then((res) => {
        return this.answer(res, "product extended info fetched success");
      })
      .catch((error) => {
        console.error(
          "ProductsController.getProductFeedbacksIncluded: ",
          error
        );
        this.error("Can not fetch product extended info");
      });
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
  public getProductVendorIncluded(query: any) {
    const id = parseInt(query.id as string);

    const { ProductService } = this.di;

    this.message("product extended info fetched success").error(
      "Can not fetch product extended info"
    );
    return ProductService.getProductVendorIncluded(id);

    return ProductService.getProductVendorIncluded(id)
      .then((res) => {
        return this.answer(res, "product extended info fetched success");
      })
      .catch((error) => {
        console.error("ProductsController.getProductVendorIncluded: ", error);
        this.error("Can not fetch product extended info");
      });
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
      )
        .then((res) => {
          return this.answer(res, "product added success");
        })
        .catch((error) => {
          console.error("ProductsController.addProduct: ", error);
          this.error("Can not add product");
        });
    } else {
      throw Error("Can not add product: not full data");
    }
  }
}

/*const productController = new ProductController();

export default productController;*/
