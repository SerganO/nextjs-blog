import { combineReducers } from "redux"
import feedbackReducer from "./feedbackReducer"
import userReducer from "./userReducer"
import productReducer from "./productReducer"
import {HYDRATE} from "next-redux-wrapper"
const rootReducer = combineReducers({
    userReducer,
    productReducer,
    feedbackReducer
})

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