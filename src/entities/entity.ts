import getConfig from "next/config";
import { Schema, normalize, schema } from "normalizr";
import { put, call, take, fork } from "redux-saga/effects";
import BaseClientContext from "src/di/baseClientContext";
import * as actionTypes from "store/actionTypes";
import IClientContextContainer from "src/di/interfaces/container";
import clientContainer from "src/di/clientContainer";

const {
  publicRuntimeConfig: { BASE_URL, API_STRING },
} = getConfig();

enum HTTP_METHOD {
  GET,
  POST,
}

export class Entity extends BaseClientContext {
  public static _actions = [];
  private _schema;
  private _entityName;

  constructor(opts: IClientContextContainer) {
    super(opts);

    this.invokableSaga = this.invokableSaga.bind(this);
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

    let methodString = "GET";
    switch (method) {
      case HTTP_METHOD.GET:
        methodString = "GET";
        break;
      case HTTP_METHOD.POST:
        methodString = "POST";
        break;
    }

    const controller = new AbortController();
    const params: any = {
      method: methodString,
      //credentials: "same-origin",
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
    return this.actionRequest(uri, HTTP_METHOD.POST, actionTypes.ADD, data);
  };

  public xRead = (
    uri: string,
    data: any = {},
    method: HTTP_METHOD = HTTP_METHOD.GET
  ) => {
    return this.actionRequest(uri, method, actionTypes.GET, data);
  };

  public xDelete = (uri: string, data: any = {}) => {
    return this.actionRequest(uri, HTTP_METHOD.POST, actionTypes.DELETE, data);
  };

  private *actionRequest(url, HTTP_METHOD, type, data: any) {
    try {
      const sdata = yield call(this.xFetch, url, HTTP_METHOD, data);
      const nData = normalize(sdata.response, this._schema);
      yield put({ type: type, payload: { data: nData }, entityReducer: this._entityName });
    } catch (error) {
      yield put({ type: actionTypes.ERROR, error });
    }
  }

  public static sagas() {
    const objects = Reflect.getMetadata("sagas", Entity);
    const maped = objects.map((obj) => {
      const actionName = obj.className + "_" + obj.methodName;
      const classInstance = clientContainer.resolve(obj.className);
      const method = classInstance[obj.methodName].bind(classInstance);
      const saga = function* () {
        while (true) {
          console.log("wait new dispatch of ", actionName);
          const { payload } = yield take(actionName);
          console.log("call ", actionName, " with payload: ", payload);
          yield call(method, payload, true);
        }
      };
      Entity._actions = {
        ...Entity._actions,
        [actionName]: (data) => actionTypes.action(actionName, data),
      };
      return fork(saga);
    });
    return maped;
  }
  
  public invokableSaga(methodName, isSagaCall, saga, data?) {
    if (isSagaCall) {
      const boundedSaga = saga.bind(this)
      return boundedSaga(data)
    } else {
      return this.action(methodName, data)
    }
  }

  public action(methodName, data?) {
    console.log(this.constructor.name + "_" + methodName);
    const action = Entity._actions[this.constructor.name + "_" + methodName];
    return action(data);
  }
}
