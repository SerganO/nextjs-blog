import AuthController from "server/controllers/AuthController";
import container from "server/di/container";

const authController =
  container.resolve<AuthController>("AuthController");

export default authController.handler("api/login");
