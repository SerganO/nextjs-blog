import { NextApiRequest, NextApiResponse } from "next";
import { Op, FindOptions } from "sequelize";
import { createRouter } from "next-connect";

import Feedback from "../../server/models/Feedback";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const userId = req.query["user"];
  const productId = req.query["product"];

  const queryOptions: FindOptions = {};

  if (userId !== null && userId !== undefined) {
    queryOptions.where = {
      ...queryOptions.where,
      user_id: { [Op.eq]: userId },
    };
  }

  if (productId !== null && productId !== undefined) {
    queryOptions.where = {
      ...queryOptions.where,
      product_id: { [Op.eq]: productId },
    };
  }

  await Feedback.findAll(queryOptions)
    .then((feedbacks) => {
      res.status(200).json(feedbacks);
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