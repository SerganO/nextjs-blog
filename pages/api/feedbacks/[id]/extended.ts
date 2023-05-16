import { NextApiRequest, NextApiResponse } from "next";
import Feedback from "../../../../db/models/Feedback";
import User from "../../../../db/models/User";
import Product from "../../../../db/models/Product";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string);

  await Feedback.findByPk(id, {
    include: [
      { model: User, as: "author" },
      { model: Product, as: "product" },
    ],
  })
    .then((feedback) => {
      res.status(200).json(feedback);
    })
    .catch((error) => {
      res.status(404).send({ error: error });
    });
};
