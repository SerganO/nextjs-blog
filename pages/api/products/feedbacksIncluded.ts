/*import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
//import productController from "server/controllers/ProductController";
import container from "server/di/container";
const router = createRouter<NextApiRequest, NextApiResponse>();
const productController = container.resolve("ProductController");

router.get(productController.findProductsFeedbackIncluded);

export default router.handler({
  onError: (err, req, res) => {
    const error = err as Error;
    console.error(error.stack);
    res.status(500).end(error.message);
  },
});*/

/*

enum {
  productsPagination,
  productFeedback

}

manager(productPagination)

*/

// import {
//   Action,
//   RequestType,
//   addAction,
//   handler,
// } from "server/requestManager/RequestManager";

// var router = addAction(RequestType.get, Action.productsFeedbackIncluded);

// router = addAction(RequestType.post, Action.productsFeedbackIncluded, router);

// export default handler(router);


import { RequestType } from "server/controllers/BaseController";
import container from "server/di/container";

const productController = container.resolve("ProductController");

productController.get(productController.findProductsFeedbackIncluded)
.get();

export default productController.handler();
