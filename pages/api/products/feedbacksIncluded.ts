import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import productController from "server/controllers/ProductController";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(productController.findProductsFeedbackIncluded);

export default router.handler({
  onError: (err, req, res) => {
    const error = err as Error;
    console.error(error.stack);
    res.status(500).end(error.message);
  },
});
