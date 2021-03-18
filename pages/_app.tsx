import "core-js/es/map";
import "core-js/es/set";
import "core-js/es/promise";
import "core-js/es/array";
import "core-js/es/object";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import Head from "next/head";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "~/theme";

const queryClient = new QueryClient();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

App.displayName = "App";

export default App;
