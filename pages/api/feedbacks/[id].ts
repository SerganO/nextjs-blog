import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import Feedback from "../../../db/models/Feedback";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const id = parseInt(req.query.id as string);

  await Feedback.findByPk(id)
    .then((feedback) => {
      res.status(200).json(feedback);
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
