import { NextApiRequest, NextApiResponse } from "next";
import IContextContainer from "server/di/interfaces/IContextContainer";
import BaseController from "./BaseController";

export default class UserController extends BaseController {
  constructor(opts: IContextContainer) {
    super(opts);
    console.log("UserController init: ", this);
    console.log("di: ", this.di);

    this.getAllUsers = this.getAllUsers.bind(this);
    this.findUserInfo = this.findUserInfo.bind(this);
    this.getUserInfoFeedbacksIncluded =
      this.getUserInfoFeedbacksIncluded.bind(this);
    this.getUserInfoProductsIncluded =
      this.getUserInfoProductsIncluded.bind(this);
    this.addUser = this.addUser.bind(this);
    this.getServerSideUser = this.getServerSideUser.bind(this);
  }

  /**
   * getAllUsers
   */
  public getAllUsers(query: any) {
    const { UserService } = this.di;
    return UserService.getAllUsersInfo();
  }

  /**
   * findUserInfo
   */
  public findUserInfo(query: any) {
    const id = query["id"] as string;
    const { UserService } = this.di;
    return UserService.findUserInfo(id);
  }

  /**
   * getUserInfoFeedbacksIncluded
   */
  public getUserInfoFeedbacksIncluded(query: any) {
    const id = parseInt(query["id"] as string);
    const { UserService } = this.di;
    return UserService.getUserInfoFeedbacksIncluded(id);
  }

  /**
   * getUserInfoProductsIncluded
   */
  public getUserInfoProductsIncluded(query: any) {
    const id = parseInt(query["id"] as string);
    const { UserService } = this.di;
    return UserService.getUserInfoProductsIncluded(id);
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

  /**
   * addUser
   */
  public addUser(body: any) {
    let bodyString = JSON.stringify(body);
    let bodyData = JSON.parse(bodyString);

    const firstName = bodyData["firstName"] as string;
    const lastName = bodyData["lastName"] as string;
    const userEmail = bodyData["userEmail"] as string;
    const password = bodyData["password"] as string;
    const role = bodyData["role"] as string;

    if (firstName && lastName && userEmail && password && role) {
      const { UserService } = this.di;
      return UserService.addUser(
        firstName,
        lastName,
        userEmail,
        password,
        role
      );
    } else {
      throw Error("not full data");
    }
  }
}
