import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import Product from "../../../server/models/Product";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (req, res) => {
    const userID: number = parseInt(req.query["user_id"] as string);
    const title: string = req.query["t"] as string;
    const description: string = req.query["des"] as string;
    const SKU: string = req.query["sku"] as string;
    const category: string = req.query["c"] as string;
    const price: number = parseFloat(req.query["p"] as string);

    await checkAndAdd(
      req,
      res,
      userID,
      title,
      description,
      SKU,
      category,
      price
    );
  })
  .post(async (req, res) => {
    let bodyString = JSON.stringify(req.body);
    let bodyData = JSON.parse(bodyString);

    const userID: number = parseInt(bodyData["user_id"] as string);
    const title: string = bodyData["title"] as string;
    const description: string = bodyData["description"] as string;
    const SKU: string = bodyData["SKU"] as string;
    const category: string = bodyData["category"] as string;
    const price: number = parseFloat(bodyData["price"] as string);

    await checkAndAdd(
      req,
      res,
      userID,
      title,
      description,
      SKU,
      category,
      price
    );
  });

async function checkAndAdd(
  req: NextApiRequest,
  res: NextApiResponse,
  userID: number,
  title: string,
  description: string,
  SKU: string,
  category: string,
  price: number
) {
  if (userID && title && description && SKU && category && price) {
    addNewProduct(
      userID,
      title,
      description,
      category,
      SKU,
      price,
      (product) => {
        res.status(200).json(product);
      },
      (error) => {
        res.status(400).send({ error: error });
      }
    );
  } else {
    res.status(400).send({ error: "not full data" });
  }
}

async function addNewProduct(
  userId: number,
  title: string,
  description: string,
  SKU: string,
  category: string,
  price: number,
  success: (Product) => void,
  failure: (Error) => void
) {
  await Product.create({
    userId: userId,
    title: title,
    description: description,
    SKU: SKU,
    category: category,
    price: price,
  })
    .then((product) => {
      success(product);
    })
    .catch((error) => {
      failure(error);
    });
}

export default router.handler({
  onError: (err, req, res) => {
    const error = err as Error;
    console.error(error.stack);
    res.status(500).end(error.message);
  },
});