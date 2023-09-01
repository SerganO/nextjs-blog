import { combineReducers } from "redux";
import valueReducer from "./valueReducer";
import { HYDRATE } from "next-redux-wrapper";
import commonReducer from "./commonReducer";
import baseReducer from "./baseReducer";

const productsReducer = baseReducer("products")
const usersReducer = baseReducer("users")
const feedbacksReducer = baseReducer("feedbacks")
const pagesReducer = baseReducer("pages")

const rootReducer = combineReducers({
  valueReducer,
  //commonReducer,
  usersReducer,
  productsReducer,
  feedbacksReducer,
  pagesReducer,
  //mainPageInfoReducer,
});

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
