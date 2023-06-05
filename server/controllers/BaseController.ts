import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer";

enum RequestType {
  all,
  get,
  head,
  post,
  put,
  patch,
  delete,
}

export default class BaseController extends BaseContext {
  private _router;

  constructor(opts: IContextContainer) {
    super(opts);
    this._router = createRouter<NextApiRequest, NextApiResponse>();
  }

  public addAction(type: RequestType, action: any) {
    switch (type) {
      case RequestType.all:
        this._router.all(action);
        break;
      case RequestType.get:
        this._router.get(action);
        break;
      case RequestType.head:
        this._router.head(action);
        break;
      case RequestType.post:
        this._router.post(action);
        break;
      case RequestType.put:
        this._router.put(action);
        break;
      case RequestType.patch:
        this._router.patch(action);
        break;
      case RequestType.delete:
        this._router.delete(action);
        break;
    }

    return this;
  }

  public get(fn: any) {
    this.addAction(RequestType.get, fn);
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
