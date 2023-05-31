import { NextApiRequest, NextApiResponse } from "next";
import BaseContext from "server/di/BaseContext";
import container from "server/di";

export default class ProductController extends BaseContext {

  /**
   * findProductExtendedInfo
   */
  public findProductExtendedInfo(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query["id"] as string;
   //const { ProductService} = this.di
   const ProductService = container.resolve("ProductService")
    return ProductService
      .findProductExtendedInfo(id)
      .then((product) => {
        res.status(200).json(product);
      })
      .catch((error) => {
        res.status(404).send({ error: error });
      });
  }

  /**
   * findProductsFeedbackIncluded
   */
  public findProductsFeedbackIncluded(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const userId = req.query["user"] as string;

    const limit = parseInt(req.query["l"] as string);
    const offset = parseInt(req.query["o"] as string);
    //const { ProductService} = this.di
    const ProductService = container.resolve("ProductService")
    return ProductService
      .findProductsFeedbackIndluded(userId, offset, limit)
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((error) => {
        res.status(404).send({ error: error });
      });
  }

  /**
   * findProductsPaginated
   */
  public findProductsPaginated(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.query["user"] as string;
    const limit = parseInt(req.query["l"] as string);
    const offset = parseInt(req.query["o"] as string);

    //const { ProductService} = this.di
    console.log("productController dI: ", this.di)
    const ProductService = container.resolve("ProductService")
    return ProductService
      .findProductsPaginated(userId, offset, limit)
      .then((pageData) => {
        res.status(200).json(pageData);
      })
      .catch((error) => {
        res.status(404).send({ error: error });
      });
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

    //const { ProductService} = this.di
    const ProductService = container.resolve("ProductService")

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

    //const { ProductService} = this.di
    const ProductService = container.resolve("ProductService")

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
    //const { ProductService} = this.di
    const ProductService = container.resolve("ProductService")
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
    //const { ProductService} = this.di
    const ProductService = container.resolve("ProductService")
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
