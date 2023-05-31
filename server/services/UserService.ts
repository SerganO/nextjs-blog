import BaseContext from "server/di/BaseContext";
import User from "models/User";

export default class UserService extends BaseContext {
  /**
   * findUserInfo
   */
  public findUserInfo(userId: string) {
    return User.findByPk(userId);
  }
}

/*const userService = new UserService();

export default userService;*/
