import "../src/styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>Midnight</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Midnight -- A qinglong middleware" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
