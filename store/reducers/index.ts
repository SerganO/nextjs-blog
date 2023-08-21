import { combineReducers } from "redux";
import feedbackReducer from "./feedbackReducer";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import valueReducer from "./valueReducer";
import pageReducer from "./pageReducer";
import mainPageInfoReducer from "./mainPageInfoReducer";
import { HYDRATE } from "next-redux-wrapper";
import commonReducer from "./commonReducer";

const rootReducer = combineReducers({
  valueReducer,
  commonReducer,
  // userReducer,
  // productReducer,
  // feedbackReducer,
  //pageReducer,
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
