import "../styles/global.css";
import ErrorPage from "next/error";

import { Provider } from "react-redux";

import clientContainer from "src/di/clientContainer";
import ReduxStore from "store/store";
import ContainerContext from "src/ContainerContext";

const reduxStore = clientContainer.resolve<ReduxStore>("ReduxStore");

export default function App({ Component, ...rest }) {
  const { store, props } = reduxStore._wrapper.useWrappedStore(rest);
  const pageProps = props.pageProps;
  if (pageProps.error) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <ContainerContext.Provider value={clientContainer}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ContainerContext.Provider>
  );
}
