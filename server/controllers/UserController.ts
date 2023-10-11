import BaseController from "./BaseController";
import { GET, POST, SSR, USE } from "server/decorators";
import validate, { validateProps } from "server/middleware/validate";
import entity from "server/decorators/entity";

@entity("UserEntity")
export default class UserController extends BaseController {
  /**
   * getAllUsers
   */
  @GET("api/users")
  public getAllUsers({ query, fnMessage, fnError }) {
    const { UserService } = this.di;
    fnMessage("users info fetched success");
    fnError("Can not fetch users info");
    return UserService.getAllUsersInfo();
  }

  /**
   * findUserInfo
   */
  @USE(
    validate({
      type: "object",
      properties: {
        id: validateProps.queryId,
      },
      required: ["id"],
      additionalProperties: false,
    })
  )
  @GET("api/users/:id")
  @SSR("users/:id")
  public findUserInfo({ query, fnMessage, fnError }) {
    const id = query["id"] as string;
    const { UserService } = this.di;
    fnMessage("user info fetched success");
    fnError("Can not fetch user info");
    return UserService.findUserInfo(id);
  }

  /**
   * getUserInfoFeedbacksIncluded
   */
  @GET("api/users/:id/feedbacks")
  public getUserInfoFeedbacksIncluded({ query, fnMessage, fnError }) {
    const id = parseInt(query["id"] as string);
    const { UserService } = this.di;
    fnMessage("user extended info fetched success");
    fnError("Can not fetch user info");
    return UserService.getUserInfoFeedbacksIncluded(id);
  }

  /**
   * getUserInfoProductsIncluded
   */
  @GET("api/users/:id/products")
  public getUserInfoProductsIncluded({ query, fnMessage, fnError }) {
    const id = parseInt(query["id"] as string);
    const { UserService } = this.di;
    fnMessage("user extended info fetched success");
    fnError("Can not fetch user info");
    return UserService.getUserInfoProductsIncluded(id);
  }

  /**
   * addUser
   */
  @USE(
    validate({
      type: "object",
      properties: {
        firstName: { type: "string", minLength: 2 },
        lastName: { type: "string", minLength: 2 },
        userEmail: validateProps.email,
        password: validateProps.password,
        role: { type: "string" },
      },
      validateProperty: {
        role: true,
      },
      required: ["firstName", "lastName", "userEmail", "password", "role"],
      additionalProperties: false,
      errorMessage: {
        properties: {
          userEmail: "data.userEmail must contain email adress",
        },
      },
    })
  )
  @POST("api/users/add")
  public addUser({ query, fnMessage, fnError }) {
    const body = query;
    console.log("api/users/add query: ", query);
    let bodyString = JSON.stringify(body);
    let data = JSON.parse(bodyString) as IUserPostData;

    const { UserService } = this.di;
    fnMessage("user added success", "TOAST");
    fnError("Can not add user", "TOAST");
    return UserService.addUser(data);
  }
}
