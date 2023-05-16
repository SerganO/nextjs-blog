import { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";
import { createRouter } from "next-connect";

import Feedback from "../../db/models/Feedback";
import QueryOptions from "../../types/QueryOptions";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const userId = req.query["user"];
  const productId = req.query["product"];

  const queryOptions: QueryOptions = {};

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