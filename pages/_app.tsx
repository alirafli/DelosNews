import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "@components/elements";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className="mt-24">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
