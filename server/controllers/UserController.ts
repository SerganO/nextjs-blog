import { NextApiRequest, NextApiResponse } from "next";
import IContextContainer from "server/di/interfaces/IContextContainer";
import BaseController from "./BaseController";
import decorators from "server/decorators";

let GET = decorators.GET;
let POST = decorators.POST;
let SSR = decorators.SSR;

export default class UserController extends BaseController {
  constructor(opts: IContextContainer) {
    super(opts);
    console.log("UserController init: ", this);
    console.log("di: ", this.di);
  }

  /**
   * getAllUsers
   */
  @GET("api/users")
  public getAllUsers(query: any) {
    const { UserService } = this.di;
    return UserService.getAllUsersInfo();
  }

  /**
   * findUserInfo
   */
  @GET("api/users/[id]")
  @SSR("users/[id]")
  public findUserInfo(query: any) {
    const id = query["id"] as string;
    const { UserService } = this.di;
    return UserService.findUserInfo(id);
  }

  /**
   * getUserInfoFeedbacksIncluded
   */
  @GET("api/users/[id]/feedbacks")
  public getUserInfoFeedbacksIncluded(query: any) {
    const id = parseInt(query["id"] as string);
    const { UserService } = this.di;
    return UserService.getUserInfoFeedbacksIncluded(id);
  }

  /**
   * getUserInfoProductsIncluded
   */
  @GET("api/users/[id]/products")
  public getUserInfoProductsIncluded(query: any) {
    const id = parseInt(query["id"] as string);
    const { UserService } = this.di;
    return UserService.getUserInfoProductsIncluded(id);
  }

  /**
   * addUser
   */
  @POST("api/users/add")
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
