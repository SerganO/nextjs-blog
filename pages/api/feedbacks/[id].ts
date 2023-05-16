import { NextApiRequest, NextApiResponse } from "next";
import Feedback from "../../../db/models/Feedback";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string);

  await Feedback.findByPk(id)
    .then((feedback) => {
      res.status(200).json(feedback);
    })
    .catch((error) => {
      res.status(404).send({ error: error });
    });
};
