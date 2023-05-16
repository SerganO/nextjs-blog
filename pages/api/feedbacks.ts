import { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";
import Feedback from "../../db/models/Feedback";
import QueryOptions from "../../types/QueryOptions";

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
};
