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
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};
