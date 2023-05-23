import { NextApiRequest, NextApiResponse } from "next";
import { Op, FindOptions } from "sequelize";

import Product from "server/models/Product";
import Feedback from "server/models/Feedback";

import productService from "server/services/ProductService";
import { off } from "process";

class ProductController {
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
    let page = 1;
    if (context.query.page) {
      page = parseInt(context.query.page);
    }

    const userId = context.query.user;

    const offset = (page - 1) * 20;
    const limit = 20;

    let products = await productService.findProductsPaginated(
      userId,
      offset,
      limit
    );

    products = JSON.parse(JSON.stringify(products));

    return {
      props: {
        pageData,
      },
    };
  }

  /**
   * getServerSidePropsMainPage
   */
  public async getServerSidePaginated(context) {
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
}

const productController = new ProductController();

export default productController;
