/*import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

//import productController from "server/controllers/ProductController";
import container from "server/di/container";


const router = createRouter<NextApiRequest, NextApiResponse>();

const productController = container.resolve("ProductController");

router.get(productController.findProductExtendedInfo);

export default router.handler({
  onError: (err, req, res) => {
    const error = err as Error;
    console.error(error.stack);
    res.status(500).end(error.message);
  },
});*/

import {
  RequestType,
  completeCustomHandler,
} from "server/requestManager/RequestManager";

import container from "server/di/container";
import ProductController from "server/controllers/ProductController";

const productController =
  container.resolve<ProductController>("ProductController");

export default completeCustomHandler(
  RequestType.get,
  productController.findProductExtendedInfo
);
