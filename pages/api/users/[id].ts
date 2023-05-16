import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../db/models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string);

  await User.findByPk(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).send({ error: error });
    });
};
