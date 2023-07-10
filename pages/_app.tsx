import "../styles/global.css";
import ErrorPage from "next/error";
import { AppProps } from "next/app";
import { Provider } from 'react-redux'
import configureStore from 'reduxFunc/functions/configureStore'

const store = configureStore(undefined)

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
