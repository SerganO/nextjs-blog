import "../styles/global.css";
import ErrorPage from "next/error";
import { AppProps } from "next/app";
import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducrer  from "../store/reducers";

const store = createStore(rootReducrer, applyMiddleware(thunk));
export default function App({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
