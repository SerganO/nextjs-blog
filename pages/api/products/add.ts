import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../db/models/Product";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userID: number = parseInt(req.query["user_id"] as string);
  const title: string = req.query["t"] as string;
  const description: string = req.query["des"] as string;
  const SKU: string = req.query["sku"] as string;
  const category: string = req.query["c"] as string;
  const price: number = parseFloat(req.query["p"] as string);
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
};

function addNewProduct(
  userId: number,
  title: string,
  description: string,
  SKU: string,
  category: string,
  price: number,
  success: (Product) => void,
  failure: (Error) => void
) {
  Product.create({
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
