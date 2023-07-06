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
  public async login(query, user, session) {
  //public async login({identity}) {
    console.log('api/login');
    console.log("data: ",user)
    return user;
  }

 

}