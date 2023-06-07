import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer";

export enum RequestType {
  all,
  get,
  head,
  post,
  put,
  patch,
  delete
}

export default class BaseController extends BaseContext {
  private _router;

  constructor(opts: IContextContainer) {
    super(opts);
    this._router = createRouter<NextApiRequest, NextApiResponse>();
  }

  public use(callback: any) {
    this._router.use(callback);
    return this;
  }

  public all(callback: any) {
    return this.addAction(RequestType.all, callback);
  }

  public prepare() {
    this._router = createRouter<NextApiRequest, NextApiResponse>();
    return this;
  }

  public get(callback: any) {
    return this.addAction(RequestType.get, callback);
  }

  public head(callback: any) {
    return this.addAction(RequestType.head, callback);
  }

  public post(callback: any) {
    return this.addAction(RequestType.post, callback);
  }

  public put(callback: any) {
    return this.addAction(RequestType.put, callback);
  }

  public patch(callback: any) {
    return this.addAction(RequestType.patch, callback);
  }

  public delete(callback: any) {
    return this.addAction(RequestType.delete, callback);
  }

  public getServerSideProps(action: any) {
   return async (context) => {
      let data = await action(context.query)
      data = JSON.parse(JSON.stringify(data));
      return {
        props: {
          data,
        },
      };
   }


  }


  public addAction(type: RequestType, action: any) {
    const run = (req, res) => {
      var newAction: any
      switch (type) {
        case RequestType.get:
          newAction = action(req.query);
          break;
        default:
          newAction = action(req.body);
          break;
      }

      try {
        newAction
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

    switch (type) {
      case RequestType.all:
        this._router.all(run);
        break;
      case RequestType.get:
        this._router.get(run);
        break;
      case RequestType.head:
        this._router.head(run);
        break;
      case RequestType.post:
        this._router.post(run);
        break;
      case RequestType.put:
        this._router.put(run);
        break;
      case RequestType.patch:
        this._router.patch(run);
        break;
      case RequestType.delete:
        this._router.delete(run);
        break;
    }

    return this;
  }

  public handler() {
    return this._router.handler({
      onError: (err, req, res) => {
        const error = err as Error;
        console.error(error.stack);
        res.status(500).end(error.message);
      },
    });
  }
}
