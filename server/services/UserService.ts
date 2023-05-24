import User from "server/models/User";

class UserService {
  /**
   * findUserInfo
   */
  public findUserInfo(userId: string) {
    return User.findByPk(userId);
  }
}

const userService = new UserService();

export default userService;
