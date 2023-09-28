import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import getConfig from "next/config";
import next from "next/types";

import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer";
import clientContainer from "src/di/clientContainer";
import { Entity } from "src/entities/entity";
import { IPagerParams } from "src/pagination/IPagerParams ";

const {
  publicRuntimeConfig: { PAGE_SIZE_10 },
} = getConfig();

type Response = {
  data: any;
  message?: string;
  isSuccess: boolean;
  code?: string;
  statusCode: number;
  pager?;
};

export default class BaseController extends BaseContext {
  private _entity: Entity = null;
  constructor(opts: IContextContainer) {
    super(opts);
  }

  protected set entity(entityName) {
    this._entity = clientContainer.resolve(entityName);
  }

  public normalizedAction(data) {
    if (this._entity == null) {
      const entityName = Reflect.getMetadata("entity", this.constructor);
      this._entity = clientContainer.resolve(entityName);
    }
    return this._entity.normalizedAction(data);
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
    const pagers: any[] = Reflect.getMetadata("pagers", this);

    let cargs = this.useClassdMiddleware();
    const router = createRouter<NextApiRequest, NextApiResponse>();

    if ("SSR" in members) {
      return async (context) => {
        const action = members["SSR"][0];
        const callback = this[action].bind(this);
        let margs = this.useMethodMiddleware(action);
        let pagerParams: IPagerParams = null;
        const isPager = pagers?.find((x) => x.methodName == action) != null;
        if (isPager) {
          const page = parseInt(context.query.page || 1);
          const pageName = context.query["pageName"];
          const perPage = parseInt(context.query.perPage || PAGE_SIZE_10);
          const filter = context.query.filter ? context.query.filter : null;
          const sort = context.query.sort ? context.query.sort : null;
          const entityName = context.query.entityName
            ? context.query.entityName
            : null;

          pagerParams = {
            page: page,
            pageName: pageName,
            perPage: perPage,
            filter: filter,
            sort: sort,
            entityName: entityName,
          };
        }
        const fnError = (message, code = "TOAST", statusCode: number = 500) => {
          context.query.errorResponse = {};
          context.query.errorResponse.isSuccess = false
          context.query.errorResponse.message = message;
          context.query.errorResponse.code = code;
          context.query.errorResponse.statusCode = statusCode;
        };

        const fnMessage = (
          message,
          code = "TOAST",
          statusCode: number = 200
        ) => {
          context.query.response = {};
          context.query.response.isSuccess = true
          context.query.response.message = message;
          context.query.response.code = code;
          context.query.response.statusCode = statusCode;
        };
        router.use(routeName, ...cargs, ...margs).get(async () => {
          let data = await callback({
            query: context.query,
            pager: pagerParams,
            fnMessage,
            fnError,
          })
            .then((response) => {
              if (isPager) {
                const pager = {
                  count: response.count,
                  page: pagerParams.page,
                  pageName: pagerParams.pageName,
                  perPage: pagerParams.perPage,
                  entityName: pagerParams.entityName,
                };
                response = {
                  data: response.items,
                  pager
                }
              } else {
                response = {
                  data: response
                }
              }
              return response;
            })
            .catch((error) => {
              console.log("error: ", error);
              return error;
            });
          data = JSON.parse(JSON.stringify(data));
          return {
            props: {
              data,
            },
          };
        });

        return router.run(context.req, context.res);
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
            let user = null;
            if (req.user != undefined) {
              user = this.json(req.user?.dataValues);
            }
            let pagerParams: IPagerParams = null;
            const isPager = pagers.find((x) => x.methodName == action) != null;

            if (isPager) {
              const page = parseInt(req.body.page || 1);
              const pageName = req.body["pageName"];
              const perPage = parseInt(req.body.perPage || PAGE_SIZE_10);
              const filter = req.body.filter ? req.body.filter : null;
              const sort = req.body.sort ? req.body.sort : null;
              const entityName = req.body.entityName
                ? req.body.entityName
                : null;

              pagerParams = {
                page: page,
                pageName: pageName,
                perPage: perPage,
                filter: filter,
                sort: sort,
                entityName: entityName,
              };
            }

            const fnError = (
              message,
              code = "TOAST",
              statusCode: number = 500
            ) => {
              req.errorResponse = {};
              req.errorResponse.isSuccess = false
              req.errorResponse.message = message;
              req.errorResponse.code = code;
              req.errorResponse.statusCode = statusCode;
            };

            const fnMessage = (
              message,
              code = "TOAST",
              statusCode: number = 200
            ) => {
              req.response = {};
              req.response.isSuccess = true
              req.response.message = message;
              req.response.code = code;
              req.response.statusCode = statusCode;
            };
            callback({
              query: methodName === "get" ? req.query : req.body,
              user,
              session: req.session,
              pager: pagerParams,
              fnMessage,
              fnError,
            })
              .then((response) => {
                if (isPager) {
                  response.pager = {
                    count: response.count,
                    page: pagerParams.page,
                    pageName: pagerParams.pageName,
                    perPage: pagerParams.perPage,
                    entityName: pagerParams.entityName,
                  };
                  response.data = response.items;
                } else {
                  response.data = response
                }
                return response;
              })
              .then((result) => {
                const response = req["response"];
                response["data"] = result.data;
                if(result.pager) {
                  response["pager"] = result.pager;
                }
                res.status(response.statusCode).json(response);
              })
              .catch((error) => {
                console.error("error:", error);
                const errorResponse = req["errorResponse"];

                res.status(errorResponse.statusCode).json(errorResponse);
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
