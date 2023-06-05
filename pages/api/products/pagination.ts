/*import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

//import productController from "server/controllers/ProductController";
import container from "server/di/container";


const router = createRouter<NextApiRequest, NextApiResponse>();

const productController = container.resolve("ProductController");

router.get(productController.findProductsPaginated);
export default router.handler({
  onError: (err, req, res) => {
    const error = err as Error;
    console.error(error.stack);
    res.status(500).end(error.message);
  },
});*/

import { RequestType } from "server/controllers/BaseController";
import container from "server/di/container";

const productController = container.resolve("ProductController");

productController.addAction(
  RequestType.get,
  productController.findProductsPaginated
);

export default productController.handler();
