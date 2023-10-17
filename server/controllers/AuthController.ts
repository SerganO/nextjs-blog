import { USE, POST, GET, SSR, entity } from "server/decorators";
import session from "server/middleware/session";
import { actions, passportAuth } from "server/middleware/pasport";
import validate from "server/middleware/validate";
import BaseController from "./BaseController";

@USE([session, ...actions])
export default class AuthController extends BaseController {

  guestIdentity: Identity = {
    userId: -1,
    isGuest: true,
    firstName: "Guest"
  }


  @POST("api/login")
  @USE(
    validate({
      type: "object",
      properties: {
        password: { type: "string" },
        email: { type: "string" },
      },
      required: ["password", "email"],
      additionalProperties: false,
    })
  )
  @USE(passportAuth)
  public async login({ query, user, session, fnMessage, fnError }) {
    const identity = await this.getIdentity({session, fnMessage, fnError})
    fnMessage("User logined success", "TOAST");
    fnError("Login failed", "TOAST");
    return identity;
  }

  @POST("api/register")
  public async register({ query, user, session, fnMessage, fnError, logout }) {
    const { UserService } = this.di
    const res = await UserService.addUser(query) 
    const identity = await this.getIdentity({session, fnMessage, fnError})
    fnMessage("User register success", "TOAST");
    fnError("User register", "TOAST");
    return identity
  }

  @POST("api/logout")
  public async logout({ query, user, session, fnMessage, fnError, logout }) {
    await logout();
    await session.destroy();
    fnMessage("User logout success", "TOAST");
    fnError("Logout failed", "TOAST");
    return {...this.guestIdentity};
  }

  @GET("api/getIdentity")
  public async getIdentity({session, fnMessage, fnError}) {
    fnMessage("Identity getted success");
    fnError("Identity getting failed");
    if (session && session.passport && session.passport.user) {
      const { UserService } = this.di
      const user = await  UserService.findUserInfo(session.passport.user)
      const identity: Identity = {
        isGuest: false,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        userId: user.id
      }
      return identity

    } else {
      return {...this.guestIdentity};
    }
  }

}
