import { NextApiRequest, NextApiResponse } from "next";
import BaseContext from "server/di/BaseContext";
import container from "server/di";

export default class UserController extends BaseContext {
  /**
   * findUserInfo
   */
  public findUserInfo(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query["id"] as string;
    //const { UserService} = this.di
    const UserService = container.resolve("UserService")
    return UserService
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
    //const { UserService} = this.di
    const UserService = container.resolve("UserService")
    let user = await UserService.findUserInfo(id);
    user = JSON.parse(JSON.stringify(user));

    return {
      props: {
        user,
      },
    };
  }
}

/*const userController = new UserController();

export default userController;*/
