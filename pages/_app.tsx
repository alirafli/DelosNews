import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Footer, Navbar } from "@components/elements";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
