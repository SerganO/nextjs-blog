import { NextApiRequest, NextApiResponse } from "next";
import { Op, FindOptions } from "sequelize";
import { createRouter } from "next-connect";

import Product from "../../server/models/Product";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const userId = req.query["user"];
  console.log("get q");
  console.log(userId);
  const queryOptions: FindOptions = {};

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