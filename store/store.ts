import { AppProps } from "next/app";
import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware, { Task } from "redux-saga";

import rootReducer from "../store/reducers";
import rootSaga from "./sagas";
import { compose } from "redux";
import { AnyAction } from "redux";
import BaseContext from "server/di/BaseContext";
import IContextContainer from "server/di/interfaces/IContextContainer";

export interface SagaStore extends Store {
  sagaTask?: Task;
}

type IState = {};

class BaseStore extends BaseContext {
  rootSaga: any;
  _wrapper: any;

  constructor(opts: IContextContainer) {
    super(opts);
    this.configureDevStore()
  }

  private configureDevStore(initialState?: IState) {
    const makeStore = () => {
      const middleware = [];
      const enhancers = [];

      const sagaMiddleware = createSagaMiddleware();
      middleware.push(sagaMiddleware);

      const composeEnhancers =
        (typeof window == "object" &&
          window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
        compose;

      enhancers.push(applyMiddleware(...middleware));
      const enhancer = composeEnhancers(...enhancers);

      const store: EnhancedStore<any, AnyAction> = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(sagaMiddleware),
        //TODO add enhancers
        // enhancers: enhancer
      });

      (store as SagaStore).sagaTask = sagaMiddleware.run(this.rootSaga);
      return store;
    };

    this._wrapper = createWrapper<EnhancedStore<any, AnyAction>>(makeStore, {
      debug: true,
    });
    return this._wrapper;
  }
}
