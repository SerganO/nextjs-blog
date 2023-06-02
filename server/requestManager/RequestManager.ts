import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import container from "server/di/container";
import ProductController from "server/controllers/ProductController";
import UserController from "server/controllers/UserController";

const productController =
  container.resolve<ProductController>("ProductController");
const userController = container.resolve<UserController>("UserController");

export enum RequestType {
  all,
  get,
  head,
  post,
  put,
  patch,
  delete,
}

export enum Action {
  productsExtendedInfo,
  productsFeedbackIncluded,
  productsPagination,

  usersBaseInfo,
}

function getNotNullableRouter(router) {
  var tempRouter = router;
  if (tempRouter == null) {
    tempRouter = createRouter<NextApiRequest, NextApiResponse>();
  }
  return tempRouter;
}

export function addUseHandler(callback, router = null) {
  const tempRouter = getNotNullableRouter(router);
  tempRouter.use(callback);
  return tempRouter;
}

export function addActionHandler(
  type: RequestType,
  action: Action,
  router = null
) {
  const handlerAction = getAction(action);
  return addCustomActionHandler(type, handlerAction, router);
}

export function addCustomActionHandler(
  type: RequestType,
  actionCallback: (req: NextApiRequest, res: NextApiResponse) => {},
  router = null
) {
  const tempRouter = getNotNullableRouter(router);

  switch (type) {
    case RequestType.all:
      tempRouter.all(actionCallback);
      break;
    case RequestType.get:
      tempRouter.get(actionCallback);
      break;
    case RequestType.head:
      tempRouter.head(actionCallback);
      break;
    case RequestType.post:
      tempRouter.post(actionCallback);
      break;
    case RequestType.put:
      tempRouter.put(actionCallback);
      break;
    case RequestType.patch:
      tempRouter.patch(actionCallback);
      break;
    case RequestType.delete:
      tempRouter.delete(actionCallback);
      break;
  }

  return tempRouter;
}

export function addErrorHandler(router) {
  return router.handler({
    onError: (err, req, res) => {
      const error = err as Error;
      console.error(error.stack);
      res.status(500).end(error.message);
    },
  });
}

export function completeBaseHandler(type: RequestType, action: Action) {
  const router = addActionHandler(type, action);
  return addErrorHandler(router);
}

export function completeCustomHandler(
  type: RequestType,
  actionCallback: (req: NextApiRequest, res: NextApiResponse) => {}
) {
    console.log("completeCustomHandler");
  const router = addCustomActionHandler(type, actionCallback);
  return addErrorHandler(router);
}

function getAction(action: Action) {
  switch (action) {
    case Action.productsExtendedInfo:
      return productController.findProductExtendedInfo;
    case Action.productsFeedbackIncluded:
      return productController.findProductsFeedbackIncluded;
    case Action.productsPagination:
      return productController.findProductsPaginated;
    case Action.usersBaseInfo:
      return userController.findUserInfo;
  }
}
