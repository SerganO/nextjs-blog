import { NextApiRequest, NextApiResponse } from "next";

import productService from "server/services/ProductService";

class ProductController {
  /**
   * findProductExtendedInfo
   */
  public findProductExtendedInfo(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query["id"] as string;

    return productService
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

    return productService
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

    return productService
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

    let products = await productService.findProductsFeedbackIndluded(
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

    let products = await productService.findProductsFeedbackIndluded(
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
    console.log(userId);
    const offset = (page - 1) * 20;
    const limit = 20;

    let pageData = await productService.findProductsPaginated(
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

    let product = await productService.findProductExtendedInfo(id);
    product = JSON.parse(JSON.stringify(product));
    return {
      props: {
        product,
      },
    };
  }
}

const productController = new ProductController();

export default productController;
