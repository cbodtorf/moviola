import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to Moviola!</title>
      </Head>
      <ChakraProvider>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </>
  );
}

export default CustomApp;
