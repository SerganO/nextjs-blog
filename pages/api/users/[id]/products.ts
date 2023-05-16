import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import User from "../../../../db/models/User";
import Product from "../../../../db/models/Product";


const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const id = parseInt(req.query.id as string);

  await User.findByPk(id, { include: { model: Product, as: "products" } })
    .then((user) => {
      res.status(200).json(user);
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
  
