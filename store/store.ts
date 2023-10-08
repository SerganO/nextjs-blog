import { AnyAction, applyMiddleware, compose, Dispatch } from "redux";
import BaseClientContext from "src/di/baseClientContext";
import { all } from "redux-saga/effects";
import { Entity } from "src/entities/entity";
import createSagaMiddleware, { Task } from "redux-saga";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { createWrapper } from "next-redux-wrapper";
import BaseController from "server/controllers/BaseController";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface SagaStore extends EnhancedStore<any, AnyAction> {
  sagaTask?: Task;
}

export default class ReduxStore extends BaseClientContext {
  private _store: EnhancedStore<any, AnyAction>;
  public _wrapper;

  public store(): EnhancedStore<any, AnyAction> {
    return this._store;
  }

  public state = (): any => {
    return this._store.getState();
  };

  public dispatch = (args: any): Dispatch => {
    return this._store.dispatch(args);
  };

  constructor(opts: any) {
    super(opts);

    const store = this.configureDevStore();
    this._store = store;
  }

  public rootSaga = function* () {
    const sagas = Entity.sagas();
    yield all(sagas);
  };

  private configureDevStore(initialState?: any) {
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

  /*public getServerSideProps(controller: any) {
    return this._wrapper.getServerSideProps(controller);
  }*/

  public getServerSideProps(
    container,
    route: string,
    controllerName: string | string[]
  ) {
    return this._wrapper.getServerSideProps(
      (store) => async (context) => {
        const items = Array.isArray(controllerName)?controllerName:[controllerName];
        let response = {}
        let actions: any[] = []
        for (let i = 0; i < items.length; i++) {
          const controller = container.resolve(items[i]) as BaseController;
          const res = await (
            controller.handler(route) as (context: any) => Promise<any>
          )(context);
          response = {
            ...response,
            ...res.props.data
          }
          console.log("ssr res.props: ", res.props)
          
          actions.push(controller.normalizedAction(res.props.data))
        }
        actions.forEach(action => {
          store.dispatch(action);
        })    
        return {props: { data: response}}
      });
  }
}
