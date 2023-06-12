import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer";

export default class BaseController extends BaseContext {
  constructor(opts: IContextContainer) {
    super(opts);
  }

  public handler(routeName: string) {
    const router = createRouter<NextApiRequest, NextApiResponse>();
    const members: any = Reflect.getMetadata(routeName, this);
    var result: any;
    Object.keys(members).map((method) => {
      for (let i = 0; i < members[method].length; i++) {
        const methodName: string = method.toLowerCase(); //GET, POST, PUT, etc
        if (typeof router[methodName] === "function") {
          const action = members[method][i];
          const callback = this[action].bind(this);

          const run = (req, res) => {
            console.log("in run");
            var runAction: any;
            switch (methodName) {
              case "get":
                runAction = callback(req.query);
                break;
              default:
                runAction = callback(req.body);
                break;
            }

            try {
              runAction
                .then((data) => {
                  res.status(200).json(data);
                })
                .catch((error) => {
                  res.status(404).send({ error: error });
                });
            } catch (error) {
              res.status(404).send({ error: error });
            }
          };
          router[methodName](run);
          result = router.handler({
            onError: (err, req, res) => {
              const error = err as Error;
              console.error(error.stack);
              res.status(500).end(error.message);
            },
          });
        } else if (methodName == "ssr") {
          const action = members[method][i];
          const callback = this[action].bind(this);

          result = async (context) => {
            let data = await callback(context.query);
            data = JSON.parse(JSON.stringify(data));
            return {
              props: {
                data,
              },
            };
          };
        }
      }
    });

    return result;
  }
}
