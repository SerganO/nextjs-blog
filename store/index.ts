import { AppProps } from "next/app";
import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducrer  from "../store/reducers";

const store = context => createStore(rootReducrer, applyMiddleware(thunk));
export const wrapper = createWrapper(store, {debug: true});