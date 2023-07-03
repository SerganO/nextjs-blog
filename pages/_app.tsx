import "../styles/global.css";
import ErrorPage from 'next/error';
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  if (pageProps.error) {
    return <ErrorPage statusCode={404} />;
  }


  return <Component {...pageProps} />;
}
