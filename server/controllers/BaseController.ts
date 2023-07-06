import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import next from "next/types";

import BaseContext from "server/di/BaseContext";
import container from "server/di/container";
import IContextContainer from "server/di/interfaces/IContextContainer";

export default class BaseController extends BaseContext {
  constructor(opts: IContextContainer) {
    super(opts);
  }

  private useClassdMiddleware() {
    const key = this.constructor.name;
    console.log("key: ", key);
    const methodMiddleware = Reflect.getMetadata(key, this.constructor);
    const methodArgs = Array.isArray(methodMiddleware) ? methodMiddleware : [];
    return methodArgs;
  }

  private useMethodMiddleware(methodName: string) {
    const key = this.constructor.name + "_" + methodName;
    console.log("key: ", key);
    const methodMiddleware = Reflect.getMetadata(key, this.constructor);
    const methodArgs = Array.isArray(methodMiddleware) ? methodMiddleware : [];
    return methodArgs;
  }

  public handler(routeName: string) {
    console.log("routeName: ", routeName);

    const members: any = Reflect.getMetadata(routeName, this);
    let cargs = this.useClassdMiddleware();
    const router = createRouter<NextApiRequest, NextApiResponse>();
    console.log("members: ", members);
    console.log("cargs: ", cargs);
    if ("SSR" in members) {
      return async (context) => {
        const action = members["SSR"][0];
        const callback = this[action].bind(this);
        let margs = this.useMethodMiddleware(action);

        console.log("IN FUNCTION");
        router.use(routeName, ...cargs, ...margs).get(async () => {
          let data = await callback(context.query);
          data = JSON.parse(JSON.stringify(data));
          return {
            props: {
              data,
            },
          };
        });

        return router.run(context.req, context.res);

        /*let data = await callback(context.query);
        data = JSON.parse(JSON.stringify(data));
        console.log("old ssr data: ", data)

        return {
          props: {
            data,
          },
        };*/

        /*router.get(async (req, res) => {
          console.log("SSR FUNC CALL")
          let data = await callback(context.query);
          data = JSON.parse(JSON.stringify(data));
          return {
            props: {
              data,
            },
          };
        });

        return router.run(context.req, context.res);*/
      };
    }

    Object.keys(members).map((method) => {
      for (let i = 0; i < members[method].length; i++) {
        const methodName: string = method.toLowerCase(); //GET, POST, PUT, etc
        const action = members[method][i];
        const callback = this[action].bind(this);
        if (typeof router[methodName] === "function") {
          let margs = this.useMethodMiddleware(action);

          router[methodName](routeName, ...cargs, ...margs, (req, res) => {
            console.log("handler callback");
            console.log("req.user: ", req.user)
            const user = this.json(req.user.dataValues)
            callback(methodName === "get" ? req.query : req.body, user, req.session)
              .then((data) => {
                //console.log("data: ", data);
                console.log("return res data");
                res.status(200).json(data);
              })
              .catch((error) => {
                console.log("catch");
                res.status(404).send({ error: error });
              });
          });
        }
      }
    });

    console.log("handler return");
    return router.handler({
      onError: (err, req, res) => {
        const error = err as Error;
        console.error(error.stack);
        console.log("error: ", error);
        res.status(500).end(error.message);
      },
    });
  }

  protected json(params: any) {
    return JSON.parse(JSON.stringify(params));
  }
}
