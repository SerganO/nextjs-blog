import getConfig from "next/config";
import { Schema, normalize, schema } from "normalizr";
import { put } from "redux-saga/effects";
import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer";
import * as actionTypes from "store/actionTypes";

const {
  publicRuntimeConfig: { BASE_URL, API_STRING },
} = getConfig();

enum HTTP_METHOD {
  GET,
  POST,
}

export class Entity extends BaseContext {
  private _schema;
  private _entityName;

  constructor(opts: IContextContainer) {
    super(opts);
  }

  protected initSchema(key: string | symbol, definition?: Schema, options?) {
    this._entityName = key;
    this._schema = new schema.Entity(key, definition, options);
  }

  protected xFetch(
    endpoint: string,
    method: HTTP_METHOD,
    data = {},
    token?: string
  ) {
    let fullUrl = `${BASE_URL}${API_STRING}${endpoint}`;

    const headers: any = {
      "Access-Control-Allow-Origin": "*",
    };
    if (token) {
      headers["Authorization"] = "bearer " + token; // get token from cookies
    }

    const controller = new AbortController();
    const params: any = {
      method,
      credentials: "same-origin",
      headers,
      signal: controller.signal,
    };

    if (method !== HTTP_METHOD.GET) {
      params.headers["content-type"] = "application/json";
      params.body = JSON.stringify(data);
    } else {
      const opts = Object.entries(data)
        .map(([key, val]) => `${key}=${val}`)
        .join("&");
      fullUrl += opts.length > 0 ? `?${opts}` : "";
    }

    const timeoutId = setTimeout(() => {
      console.log("Request rejected due to the timeout");
      controller.abort();
    }, 5000);
    console.log(method, fullUrl, params);
    return fetch(fullUrl, params)
      .then((response) => {
        clearTimeout(timeoutId);
        return response.json().then((json) => ({ json, response }));
      })
      .then(({ json, response }) =>
        Promise.resolve({
          success: !!response.ok,
          response: json,
        })
      )
      .catch((e) => {
        controller.abort();
        console.error("request excption", fullUrl, e);
        clearTimeout(timeoutId);
        return Promise.resolve({
          success: false,
          response: {},
        });
      });
  }

  public xSave = (uri: string, data: any = {}) => {
    this.actionRequesst(
      uri,
      HTTP_METHOD.POST,
      actionTypes.ADD,
      data
    );
  };

  public xRead = (
    uri: string,
    data: any = {},
    method: HTTP_METHOD = HTTP_METHOD.GET
  ) => {
    return this.actionRequesst(
      uri,
      method,
      actionTypes.GET,
      data
    );
  };

  public xDelete = (uri: string, data: any = {}) => {
    return this.actionRequesst(
      uri,
      HTTP_METHOD.POST,
      actionTypes.DELETE,
      data
    );
  };

  private async *actionRequesst(url, HTTP_METHOD, type, data: any) {
    const sdata = await this.xFetch(url, HTTP_METHOD, data);
    const nData = normalize(sdata.response, this._schema);
    yield put({ type: type, payload: { nData } });
  }

  public sagas() {
    return []
  }
}
