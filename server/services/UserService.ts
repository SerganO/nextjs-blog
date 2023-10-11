import BaseContext from "server/di/BaseContext";

export default class UserService extends BaseContext {
  /**
   * getAllUsersInfo
   */
  public getAllUsersInfo() {
    const { User } = this.di;

    return User.findAll();
  }

  /**
   * findUserInfo
   */
  public findUserInfo(userId: string) {
    const { User } = this.di;

    return User.findByPk(userId);
  }

  /**
   * getUserInfoFeedbacksIncluded
   */
  public getUserInfoFeedbacksIncluded(id: number) {
    const { User, Feedback } = this.di;
    return User.findByPk(id, { include: { model: Feedback, as: "feedbacks" } });
  }

  /**
   * getUserInfoProductsIncluded
   */
  public getUserInfoProductsIncluded(id: number) {
    const { User, Product } = this.di;
    return User.findByPk(id, { include: { model: Product, as: "products" } });
  }

  /**
   * findUserWithEmailAndPassword
   */
  public findUserWithEmailAndPassword(email: string, password: string) {
    const { User } = this.di;

    return User.findOne({
      where: {
        user_email: email,
        password: password,
      },
    });
  }

  /**
   * addUser
   */
  public addUser(
    data: IUserPostData
  ) {
    const { User } = this.di;

    return User.create({
      ...data
    });
  }
}
