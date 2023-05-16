import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../db/models/Product";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string);

  await Product.findByPk(id)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(404).send({ error: error });
    });
};
