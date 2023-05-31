import BaseContext from "server/di/BaseContext";
//import User from "models/User";
import IContextContainer from "server/di/interfaces/IContextContainer";

export default class UserService extends BaseContext {
  constructor(opts: IContextContainer) {
    super(opts);
    this.di = opts;
    console.log("UserService init: ", this);
    console.log("di: ", this.di);
  }

  /**
   * findUserInfo
   */
  public findUserInfo(userId: string) {
    const { User } = this.di;

    return User.findByPk(userId);
  }
}

/*const userService = new UserService();

export default userService;*/
