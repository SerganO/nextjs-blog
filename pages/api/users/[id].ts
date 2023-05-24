import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import userController from "server/controllers/UserController";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(userController.findUserInfo);

export default router.handler({
  onError: (err, req, res) => {
    const error = err as Error;
    console.error(error.stack);
    res.status(500).end(error.message);
  },
});
  
