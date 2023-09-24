import { AnyAction, CombinedState, Reducer, combineReducers } from "redux";
import valueReducer from "./valueReducer";
import { HYDRATE } from "next-redux-wrapper";
import baseReducer from "./baseReducer";
import { Entity } from "src/entities/entity";
import { pagination } from "./paginationReducer";

let combinedReducers = Reflect.getMetadata("reducers", Entity).reduce(
  (reducers, obj) => {
    const key = `${obj.reducerName}`;
    const reducer = baseReducer(obj.reducerName);
    return {
      ...reducers,
      [key]: reducer,
    };
  },
  { valueReducer, pagination }
);

const rootReducer = combineReducers(combinedReducers) as Reducer<
  CombinedState<any>,
  AnyAction
>;

export default (state, action) => {
  if (action.type === HYDRATE) {
    let nextState = {
      ...state,
    };

    const hydratedState = action.payload;

    Object.keys(state).forEach((reducer) => {
      if (hydratedState[reducer]) {
        let newValues: any = {};
        const newData = hydratedState[reducer];
        newValues = [state[reducer] ?? {}, newData ?? {}].reduce((
          r,
          o
        ) => {
          Object.keys(o).forEach(k => r[k] = o[k]);
          return r;
        },
        {});

        nextState[reducer] = {
          ...nextState[reducer],
          ...newValues,
        };
      }
    });
    return { ...state, ...nextState };
  } else {
    return rootReducer(state, action);
  }
};