import { NextApiRequest, NextApiResponse } from "next";
import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer ";

export default class UserController extends BaseContext {
  constructor(opts: IContextContainer) {
    super(opts);
    this.di = opts;
    console.log("UserController init: ", this);
    console.log("di: ", this.di);

    this.findUserInfo = this.findUserInfo.bind(this);
    this.getServerSideUser = this.getServerSideUser.bind(this);
  }

  /**
   * findUserInfo
   */
  public findUserInfo(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query["id"] as string;
    const { UserService } = this.di;
    return UserService.findUserInfo(id)
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
    const { UserService } = this.di;
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
