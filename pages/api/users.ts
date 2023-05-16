import { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import User from "../../db/models/User";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  await User.findAll()
    .then((users) => {
      res.status(200).json(users);
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
  await User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(404).send({ error: error });
    });
};*/
