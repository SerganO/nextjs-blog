import "../styles/global.css";
import ErrorPage from "next/error";

import { Provider } from "react-redux";
//import { wrapper } from "store";

import clientContainer from "src/di/clientContainer";
import ReduxStore from "store/store";

const reducStore = clientContainer.resolve<ReduxStore>("ReduxStore")

export default function App({ Component, ...rest}) {
  const {store, props} = reducStore._wrapper.useWrappedStore(rest);
  const pageProps = props.pageProps
  if (pageProps.error) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
