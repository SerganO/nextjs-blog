import {USE, POST } from "server/decorators"
import session from "server/middleware/session"
import {actions, passportAuth} from "server/middleware/pasport"
import validate from "server/middleware/validate";
import BaseController from "./BaseController";


@USE([session, ...actions])
export default class AuthController extends BaseController {

  @POST('api/login')
  @USE(
    validate({
      type: 'object',
      properties: {
        password: {type: "string"},
        email: {type: "string"},
      },
      required: ['password', 'email'],
      additionalProperties: false,
    })
  )
  @USE(passportAuth)
  public async login({query, user, session, fnMessage, fnError}) {
    fnMessage( "User logined success", "TOAST")
    fnError("Login failed", "TOAST")
    return user
  }

  @POST('api/logout')
  public async logout({query, user, session, fnMessage, fnError, logout}) {
    await logout()
    await session.destroy()
    fnMessage( "User logout success", "TOAST")
    fnError("Logout failed", "TOAST")
    return {}
  }

 

}