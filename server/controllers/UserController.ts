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
    return UserService.getAllUsersInfo().then(
      res => {
        return this.answer(res, "users info fetched success")
        // return {
        //   data: res,
        //   message: "users info fetched success"
        // }
      }
    ).catch(error => {
      console.error('UserController.getAllUsers()', error);
      return this.error("Can not fetch users info")
      // return {
      //   data: null,
      //   message: "Can not fetch users info"
      // }
    });;
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
    return UserService.findUserInfo(id).then(res => {
      return this.answer(res, "user info fetched success")
      // return {
      //   data: res,
      //   message: "user info fetched success"
      // }
    }).catch(error => {
      console.error('UserController.findUserInfo()', error);
      this.error( "Can not fetch user info")
      // return {
      //   data: null,
      //   message: "Can not fetch user info"
      // }
    });;
  }

  /**
   * getUserInfoFeedbacksIncluded
   */
  @GET("api/users/:id/feedbacks")
  public getUserInfoFeedbacksIncluded(query: any) {
    const id = parseInt(query["id"] as string);
    const { UserService } = this.di;
    return UserService.getUserInfoFeedbacksIncluded(id).then(res => {
      return this.answer(res, "user extended info fetched success")
      // return {
      //   data: res,
      //   message: "user extended info fetched success"
      // }
    }).catch(error => {
      console.error('UserController.getUserInfoFeedbacksIncluded()', error);
      return this.error("Can not fetch user info")
      // return {
      //   data: null,
      //   message: "Can not fetch user info"
      // }
    });;
  }

  /**
   * getUserInfoProductsIncluded
   */
  @GET("api/users/:id/products")
  public getUserInfoProductsIncluded(query: any) {
    const id = parseInt(query["id"] as string);
    const { UserService } = this.di;
    return UserService.getUserInfoProductsIncluded(id).then(res => {
      return this.answer(res, "user extended info fetched success")
      // return {
      //   data: res,
      //   message: "user extended info fetched success"
      // }
    }).catch(error => {
      console.error('UserController.getUserInfoProductsIncluded()', error);
      return this.error("Can not fetch user info")
      // return {
      //   data: null,
      //   message: "Can not fetch user info"
      // }
    });
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
      ).then(res => {
        return this.answer(res, "user added success")
        // return {
        //   data: res,
        //   message: "user added success"
        // }
      }).catch(error => {
        console.error('UserController.addUser()', error);
        return this.error("Can not add user")
        // return {
        //   data: null,
        //   message: "Can not add user"
        // }
      });
    } else {
      throw Error("Can not add user: not full data");
    }
  }
}
