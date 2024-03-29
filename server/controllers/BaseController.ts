import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import getConfig from "next/config";

import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer";
import clientContainer from "src/di/clientContainer";
import { BaseEntity } from "src/entities/BaseEntity";
import { IPagerParams } from "src/pagination/IPagerParams ";

const {
  publicRuntimeConfig: { PAGE_SIZE_20 },
} = getConfig();

export default class BaseController extends BaseContext {
  private _entity: BaseEntity = null;
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
    const methodMiddleware = Reflect.getMetadata(key, this.constructor);
    const methodArgs = Array.isArray(methodMiddleware) ? methodMiddleware : [];
    return methodArgs;
  }

  private useMethodMiddleware(methodName: string) {
    const key = this.constructor.name + "_" + methodName;
    const methodMiddleware = Reflect.getMetadata(key, this.constructor);
    const methodArgs = Array.isArray(methodMiddleware) ? methodMiddleware : [];
    return methodArgs;
  }

  public handler(routeName: string) {
    const members: any = Reflect.getMetadata(routeName, this);
    let pagers: any[] = Reflect.getMetadata("pagers", this);

    if (pagers == undefined) {
      pagers = [];
    }

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
          const perPage = parseInt(context.query.perPage || PAGE_SIZE_20);
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

        const fnRes =
          (fieldName, isSuccess, defaultCode, defaultStatusCode) =>
          (
            message,
            code = defaultCode,
            statusCode: number = defaultStatusCode
          ) => {
            context.query[fieldName] = {};
            context.query[fieldName].isSuccess = isSuccess;
            context.query[fieldName].message = message;
            context.query[fieldName].code = code;
            context.query[fieldName].statusCode = statusCode;
          };

        const fnError = fnRes("errorResponse", false, "ERROR", 500);
        const fnMessage = fnRes("response", true, "OK", 200);

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
                  pager,
                };
              } else {
                response = {
                  data: response,
                };
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
            if (req && req.user && req.user?.dataValues) {
              user = this.json(req.user?.dataValues);
            }
            let pagerParams: IPagerParams = null;
            const isPager = pagers.find((x) => x.methodName == action) != null;

            if (isPager) {
              const page = parseInt(req.body.page || 1);
              const pageName = req.body["pageName"];
              const perPage = parseInt(req.body.perPage || PAGE_SIZE_20);
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

            const fnRes =
              (fieldName, isSuccess, defaultCode, defaultStatusCode) =>
              (
                message,
                code = defaultCode,
                statusCode: number = defaultStatusCode
              ) => {
                req[fieldName] = {};
                req[fieldName].isSuccess = isSuccess;
                req[fieldName].message = message;
                req[fieldName].code = code;
                req[fieldName].statusCode = statusCode;
              };

            const fnError = fnRes("errorResponse", false, "ERROR", 500);
            const fnMessage = fnRes("response", true, "OK", 200);
            callback({
              query: methodName === "get" ? req.query : req.body,
              user,
              session: req.session,
              pager: pagerParams,
              fnMessage,
              fnError,
              logout: req.logout,
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
                    pager,
                  };
                } else {
                  response = {
                    data: response,
                  };
                }
                return response;
              })
              .then((result) => {
                const response = req["response"];
                response["data"] = result.data;
                if (result.pager) {
                  response["pager"] = result.pager;
                }
                res.status(response.statusCode).json(response);
              })
              .catch((error) => {
                console.log("error:", error);
                const errorResponse = req["errorResponse"];
                res.status(errorResponse.statusCode).json(errorResponse);
              });
          });
        }
      }
    });

    return router.handler({
      onError: (err, req, res) => {
        console.log("error:", err);
        const errorResponse = req["errorResponse"];
        res.status(errorResponse.statusCode).json(errorResponse);
      },
    });
  }

  protected json(params: any) {
    return JSON.parse(JSON.stringify(params));
  }
}
