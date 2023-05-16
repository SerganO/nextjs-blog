import { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";
import Product from "../../db/models/Product";
import QueryOptions from "../../types/QueryOptions";
import { createRouter, expressWrapper } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const userId = req.query["user"];

  const queryOptions: QueryOptions = {};

  if (userId !== null && userId !== undefined) {
    queryOptions.where = {
      ...queryOptions.where,
      user_id: { [Op.eq]: userId },
    };
  }

  await Product.findAll(queryOptions)
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      res.status(404).send({ error: error });
    });
});

export default router.handler({
  onError: (err, req, res) => {
    const error = err as Error;
    console.error(error.stack);
    res.status(500).end(error.message);
  },
});

/*export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query["user"];

  const queryOptions: QueryOptions = {};

  if (userId !== null && userId !== undefined) {
    queryOptions.where = {
      ...queryOptions.where,
      user_id: { [Op.eq]: userId },
    };
  }

  await Product.findAll(queryOptions)
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      res.status(404).send({ error: error });
    });
};*/
