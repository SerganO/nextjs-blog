/*import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

//import userController from "server/controllers/UserController";

import container from "server/di/container";

const router = createRouter<NextApiRequest, NextApiResponse>();
const userController = container.resolve("UserController");

router.get(userController.findUserInfo);

export default router.handler({
  onError: (err, req, res) => {
    const error = err as Error;
    console.error(error.stack);
    res.status(500).end(error.message);
  },
});*/

import {
  Action,
  RequestType,
  completeBaseHandler,
} from "server/requestManager/RequestManager";

export default completeBaseHandler(RequestType.get, Action.usersBaseInfo);
