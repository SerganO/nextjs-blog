import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import getConfig from "next/config";
import next from "next/types";

import BaseContext from "server/di/BaseContext";
import container from "server/di/container";
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
  //isSuccess: boolean;
  code?: string;
  statusCode: number;
  pager?;
};

export default class BaseController extends BaseContext {
  private _entity: Entity;
  private _response: Response;
  private _errorResponse: Response;
  constructor(opts: IContextContainer) {
    super(opts);

    this._response = {
      data: {},
      message: '',
      //isSuccess: true,
      statusCode: 200,
    }
    this.answer = this.answer.bind(this);
    this.error = this.error.bind(this);
  }

  protected set entity(entityName) {
    this._entity = clientContainer.resolve(entityName)
  }

  public normalizedAction(data) {
    return this._entity.normalizedAction(data)
  }

  protected clear() {
    this._response = {
      data: {},
      statusCode: 200
    }
    this._errorResponse = {
      data: null,
      statusCode: 500
    }
    return this
  }

  protected error(message, code = 'TOAST', statusCode: number = 500) {
    this._errorResponse.message = message;
    this._errorResponse.code = code;
    this._errorResponse.statusCode = statusCode
    return this;
  }

  protected message(message, code = 'TOAST', statusCode: number = 200) {
      this._response.message = message;
      this._response.code = code;
      this._response.statusCode = statusCode
      return this;
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

  protected extendedAnswer(
    data: any,
    message: string,
    isSuccess: boolean = true,
    code = "OK",
    statusCode: number = 200
  ) {
    return {
      data,
      message,
      isSuccess: isSuccess,
      code,
      statusCode: statusCode,
    } as Response;
  }

  protected answer(
    data: any,
    message: string,
    isSuccess: boolean = true,
    code = "OK",
    statusCode: number = 200
  ) {
    return {
      data,
      message,
      isSuccess: isSuccess,
      code,
      statusCode: statusCode,
    } as Response;
  }

  protected errorsss(message: string, code = "FAIL", statusCode: number = 500) {
    return this.answer(null, message, false, code, statusCode);
  }

  public handler(routeName: string) {
    console.log("routeName: ", routeName);

    const members: any = Reflect.getMetadata(routeName, this);
    const pagers: any[] = Reflect.getMetadata("pagers", this);

    let cargs = this.useClassdMiddleware();
    const router = createRouter<NextApiRequest, NextApiResponse>();
    console.log("members: ", members);
    console.log("cargs: ", cargs);

    if ("SSR" in members) {
      return async (context) => {
        const action = members["SSR"][0];
        const callback = this[action].bind(this);
        let margs = this.useMethodMiddleware(action);
        let pagerParams: IPagerParams = null;
        const isPager = pagers?.find((x) => x.methodName == action) != null;
        if (isPager) {
          console.log("pager function: ", action);
          const page = parseInt(context.query.page || 1);
          const pageName = context.query["pageName"];
          const perPage = parseInt(context.query.perPage || PAGE_SIZE_10);
          const filter =context.query.filter ? context.query.filter : null;
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
        console.log("IN FUNCTION");
        router.use(routeName, ...cargs, ...margs).get(async () => {
          let data = await callback(context.query, pagerParams).then((response) => {
            console.log("this._response: ", this._response)
            this._response.data = response
            console.log("this._response: ", this._response)
            if (isPager) {
              this._response.pager = {
                count: this._response.data.count,
                page: pagerParams.page,
                pageName: pagerParams.pageName,
                perPage: pagerParams.perPage,
                entityName: pagerParams.entityName,
              };
              this._response.data = this._response.data.items;
              /*data = {
                pager: {
                  items: data.items,
                  count: data.count,
                  page: pager.page,
                  pageName: pager.pageName,
                  perPage: pager.perPage,
                  entityName: pager.entityName,
                },
                message: data.message,
              };*/
            }
            //data['message']
            console.log("this._response: ", this._response)
            return this._response;
          }).catch((error)=> {
            
            console.log("error: ", error)
            return this._errorResponse
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
            console.log("handler callback");
            console.log("req.user: ", req.user);
            console.log("req.session: ", req.session);
            let user = null;
            if (req.user != undefined) {
              user = this.json(req.user?.dataValues);
            }
            let pagerParams: IPagerParams = null;
            const isPager = pagers.find((x) => x.methodName == action) != null;

            if (isPager) {
              console.log("pager function: ", action);
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
            console.log(pagerParams);
            callback(
              methodName === "get" ? req.query : req.body,
              user,
              req.session,
              pagerParams
            )
              .then((response) => {
                console.log("this._response: ", this._response)
                this._response.data = response
                console.log("this._response: ", this._response)
                if (isPager) {
                  this._response.pager = {
                    count: this._response.data.count,
                    page: pagerParams.page,
                    pageName: pagerParams.pageName,
                    perPage: pagerParams.perPage,
                    entityName: pagerParams.entityName,
                  };
                  this._response.data =  this._response.data.items;
                  /*data = {
                    pager: {
                      items: data.items,
                      count: data.count,
                      page: pager.page,
                      pageName: pager.pageName,
                      perPage: pager.perPage,
                      entityName: pager.entityName,
                    },
                    message: data.message,
                  };*/
                }
                console.log("this._response: ", this._response)
                return this._response;
              })
              .then((data) => {
                console.log("return res data");
                const response = data as Response;
                /*
                  1- {
                    filed_name: value1
                    pager: 34
                  }
                  2 -[{},{},{}]
                  3 {
                    pager: {}
                  }


                  {
                      data: {

                      }
                      pager: {
                         pageName: pageName,
                          perPage: perPage,
                          filter: filter,
                          sort: sort,
                          entityName: entityName,
                          count: 1250
                      }
                      message: "User was updated succesefully",
                      code: "reset", "logout", "restart", "toast", "dialog",
                      statusCode: 200
                  }
                   
                */

                //res.status(200).json(data);
                res.status(response.statusCode).json(response);
              })
              .catch((error) => {
                console.error("error:", error);
                
                //res.status(500).send({ error: error });
                res.status(this._errorResponse.statusCode).json(this._errorResponse);
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
