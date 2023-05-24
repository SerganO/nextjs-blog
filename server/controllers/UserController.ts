import { NextApiRequest, NextApiResponse } from "next";

import userService from "server/services/UserService";

class UserController {
  /**
   * findUserInfo
   */
  public findUserInfo(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query["id"] as string;

    return userService
      .findUserInfo(id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(404).send({ error: error });
      });
  }

  /**
   * getServerSideUser
   */
  public async getServerSideUser(context) {
    const id = context.params.id;

    let user = await userService.findUserInfo(id);
    user = JSON.parse(JSON.stringify(user));

    return {
      props: {
        user,
      },
    };
  }
}

const userController = new UserController();

export default userController;
