
import UserController from "server/controllers/UserController";
import container from "server/di/container";

const userController = container.resolve<UserController>("UserController")

export default userController.prepare().get(userController.findUserInfo).handler()
