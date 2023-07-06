import { NextApiRequest, NextApiResponse } from "next";
import IContextContainer from "server/di/interfaces/IContextContainer";
import BaseController from "./BaseController";
import {GET, POST, SSR, USE} from "server/decorators";
import validate,  { validateProps} from "server/middleware/validate";

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
  @USE(validate({
    type: 'object',
    properties: {
      id: validateProps.queryId,
    },
    required: ['id'],
    additionalProperties: false,
  }))
  @GET("api/users/:id")
  @SSR("users/:id")
  public findUserInfo(query: any) {
    const id = query["id"] as string;
    const { UserService } = this.di;
    return UserService.findUserInfo(id);
  }

  /**
   * getUserInfoFeedbacksIncluded
   */
  @GET("api/users/:id/feedbacks")
  public getUserInfoFeedbacksIncluded(query: any) {
    const id = parseInt(query["id"] as string);
    const { UserService } = this.di;
    return UserService.getUserInfoFeedbacksIncluded(id);
  }

  /**
   * getUserInfoProductsIncluded
   */
  @GET("api/users/:id/products")
  public getUserInfoProductsIncluded(query: any) {
    const id = parseInt(query["id"] as string);
    const { UserService } = this.di;
    return UserService.getUserInfoProductsIncluded(id);
  }

  /**
   * addUser
   */
  @USE(
    validate({
      type: 'object',
      properties: {
        firstName: {type: "string", minLength: 2},
        lastName: {type: "string", minLength: 2},
        userEmail: validateProps.email,
        password: validateProps.password,
        role: {type: "string"},
      },
      validateProperty: {
        role: true,
      },
      required: ['firstName', 'lastName','userEmail','password','role'],
      additionalProperties: false,
      errorMessage: {
        properties: {
          userEmail: "data.userEmail must contain email adress"
        },
      },
    })
  )
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
