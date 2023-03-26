import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Footer, Navbar } from "@components/elements";
import { AuthContextProvider } from "context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </AuthContextProvider>
  );
}

export default MyApp;
