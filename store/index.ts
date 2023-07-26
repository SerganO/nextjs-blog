import { AppProps } from "next/app";
import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
//import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware, {Task} from "redux-saga";

import rootReducer from "../store/reducers";
import rootSaga from "./sagas";
import { compose } from "redux";
import { AnyAction } from "redux";


export interface SagaStore extends Store {
  sagaTask?: Task;
}
/*const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducrer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)*/

//const action = type => store.dispatch({type})

//put = dispatch

/*export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducrer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga)
  return store;
};*/

/*const store = context => createStore(rootReducrer, applyMiddleware(thunk));
export const wrapper = createWrapper(store, {debug: true});*/

import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

const makeStore = () => {
  const middleware = [];
  const enhancers = [];

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);
  const composeEnhancers = (typeof window == 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) || compose;
  //const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  const store: EnhancedStore<any, AnyAction> = configureStore({
    reducer: rootReducer,
    preloadedState: [],
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
    //TODO add enhancers
    // enhancers: enhancer
  });

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper<EnhancedStore<any, AnyAction>>(makeStore, {
  debug: true,
});
//return this._wrapper;

//export const wrapper = createWrapper(makeStore, {debug: true});
