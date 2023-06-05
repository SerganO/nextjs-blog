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
  findProductExtendedInfo,
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

export function addAction(
  type: RequestType,
  action: Action,
  router = null
) {
  const handlerAction = getAction(action);
  if (router == null) {
    router = createRouter<NextApiRequest, NextApiResponse>();
  }

  switch (type) {
    case RequestType.all:
      router.all(handlerAction);
      break;
    case RequestType.get:
      router.get(handlerAction);
      break;
    case RequestType.head:
      router.head(handlerAction);
      break;
    case RequestType.post:
      router.post(handlerAction);
      break;
    case RequestType.put:
      router.put(handlerAction);
      break;
    case RequestType.patch:
      router.patch(handlerAction);
      break;
    case RequestType.delete:
      router.delete(handlerAction);
      break;
  }

  return router;
}


export function handler(router) {
  return router.handler({
    onError: (err, req, res) => {
      const error = err as Error;
      console.error(error.stack);
      res.status(500).end(error.message);
    },
  });
}



// function getNotNullableRouter(router) {
//   var tempRouter = router;
//   if (tempRouter == null) {
//     tempRouter = createRouter<NextApiRequest, NextApiResponse>();
//   }
//   return tempRouter;
// }

// export function addUseHandler(callback, router = null) {
//   const tempRouter = getNotNullableRouter(router);
//   tempRouter.use(callback);
//   return tempRouter;
// }


// export function addCustomActionHandler(
//   type: RequestType,
//   actionCallback: (req: NextApiRequest, res: NextApiResponse) => {},
//   router = null
// ) {
//   if (router == null) {
//     router = createRouter<NextApiRequest, NextApiResponse>();
//   }

//   switch (type) {
//     case RequestType.all:
//       router.all(actionCallback);
//       break;
//     case RequestType.get:
//       router.get(actionCallback);
//       break;
//     case RequestType.head:
//       router.head(actionCallback);
//       break;
//     case RequestType.post:
//       router.post(actionCallback);
//       break;
//     case RequestType.put:
//       router.put(actionCallback);
//       break;
//     case RequestType.patch:
//       router.patch(actionCallback);
//       break;
//     case RequestType.delete:
//       router.delete(actionCallback);
//       break;
//   }

//   return router;
// }


// export function completeBaseHandler(type: RequestType, action: Action) {
//   const router = addActionHandler(type, action);
//   return addErrorHandler(router);
// }

// export function completeCustomHandler(
//   type: RequestType,
//   actionCallback: (req: NextApiRequest, res: NextApiResponse) => {}
// ) {
//     console.log("completeCustomHandler");
//   const router = addCustomActionHandler(type, actionCallback);
//   return addErrorHandler(router);
// }

