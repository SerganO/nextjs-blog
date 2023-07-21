import "../styles/global.css";
import ErrorPage from "next/error";

import { Provider } from "react-redux";
import { wrapper } from "store";


export default function App({ Component, ...rest}) {
  const {store, props} = wrapper.useWrappedStore(rest);
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
