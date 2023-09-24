import getConfig from "next/config";
import { Schema, normalize, schema } from "normalizr";
import { put, call, take, fork, select } from "redux-saga/effects";
import BaseClientContext from "src/di/baseClientContext";
import * as actionTypes from "store/actionTypes";
import IClientContextContainer from "src/di/interfaces/container";
import clientContainer from "src/di/clientContainer";
import { IPagerParams } from "src/pagination/IPagerParams ";

const {
  publicRuntimeConfig: { BASE_URL, API_STRING },
} = getConfig();

enum HTTP_METHOD {
  GET,
  POST,
}

export class Entity<EntityInstance = null> extends BaseClientContext {
  public static _actions = [];
  private _schema;
  private _entityName;
  //public actions = [];

  constructor(opts: IClientContextContainer) {
    super(opts);

    //this.invokableSaga = this.invokableSaga.bind(this);
    this.actions = {} as { [K in Exclude<keyof this, keyof Entity>]?: string };

    this.pageEntity = this.pageEntity.bind(this);
    this.actionRequest = this.actionRequest.bind(this);
    this.normalizedData = this.normalizedData.bind(this);
    this.normalizedAction = this.normalizedAction.bind(this);
  }

  public actions: { [K in Exclude<keyof this, keyof Entity>]?: string };

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

    console.log("pre json str: ", data);
    console.log(" json str: ", JSON.stringify(data));
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
      console.log("actionRequest response: ", sdata)
      yield put(this.normalizedAction(sdata.response));
    } catch (error) {
      yield put({ type: actionTypes.ERROR, error });
    }
  }

  public normalizedData(data) {
    let schema = Array.isArray(data)
      ? [this._schema]
      : this._schema;
    return normalize(data, schema);
  }

  public normalizedAction(response, type = actionTypes.ADD) {
    try {
      return {
        type: type,
        payload: { 
          data: this.normalizedData(response.data),
          pager: response.pager
        },
        entityReducer: this._entityName,
      };
    } catch (error) {
      return { type: actionTypes.ERROR, error };
    }
  }

  public static sagas() {
    const objects = Reflect.getMetadata("sagas", Entity);
    const maped = objects.map((obj) => {
      const actionName = obj.className + "_" + obj.methodName;
      const classInstance = clientContainer.resolve(obj.className);
      const method = classInstance[obj.methodName].bind(classInstance);
      classInstance.actions[obj.methodName] = actionName;
      const saga = function* () {
        while (true) {
          console.log("wait new dispatch of ", actionName);
          const { payload } = yield take(actionName);
          console.log("call ", actionName, " with payload: ", payload);
          yield call(method, payload);
        }
      };
      return fork(saga);
    });
    return maped;
  }

  public *pageEntity(uri: string, params: IPagerParams) {
    const pageName = params.pageName;
    const pagination = yield select((state: any) => state["pagination"]);

    if (!("page" in params)) {
      console.log("No page");
      params["page"] = pagination[pageName]["currentPage"]; // pagination.getIn([pageName, 'currentPage']);
    }

    // send event about starting page fetching
    yield put(
      actionTypes.pageFetching(pageName, params.page, true, params.force)
    );
    // check if this page already fetched
    if (
      !pagination[pageName] ||
      !pagination[pageName]["pages"][params.page] ||
      //!pagination.hasIn([pageName, 'pages', params.page]) ||
      params.force
    ) {
      let count = 0;
      if (
        !params.force &&
        pagination[pageName] &&
        pagination[pageName]["count"]
        /*pagination.hasIn([pageName, 'count'])*/
      ) {
        count = pagination[pageName]["count"]; // pagination.get(pageName).get('count');
      }
      // set filter to paginator, in case fetch from getInitProps()
      const pFilter = params.filter ? params.filter : {};
      const pSort = params.sort ? params.sort : {};
      yield put(actionTypes.pageSetFilter(pageName, pFilter, pSort));
      console.log("Fetching page...");

      yield call(
        this.xRead,
        uri,
        {
          ...params,
          pageName,
          count,
          entityName: this._entityName,
        },
        HTTP_METHOD.POST
      );

      console.log("Fetched page...");
    }
    // send event about ending page fetching
    yield put(actionTypes.pageFetching(pageName, params.page, false));
  }

  /*public action(methodName, data?) {
    console.log(this.constructor.name + "_" + methodName);
    const action = Entity._actions[this.constructor.name + "_" + methodName];
    return action(data);
  }*/

  /*public invokableSaga(methodName, isSagaCall, saga, data?) {
    if (isSagaCall) {
      const boundedSaga = saga.bind(this)
      return boundedSaga(data)
    } else {
      return this.action(methodName, data)
    }
  }*/
}
