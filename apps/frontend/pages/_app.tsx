import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig } from 'chakra-ui-steps';
import { CookiesProvider } from 'react-cookie';
import './styles.css';

// Customize Stepper styles
// https://github.com/jeanverster/chakra-ui-steps#custom-styles
const CustomSteps = {
  ...StepsStyleConfig,
  baseStyle: (props) => {
    return {
      ...StepsStyleConfig.baseStyle(props),
      iconLabel: {
        ...StepsStyleConfig.baseStyle(props).iconLabel,
        fontSize: '10px'
      }
    };
  }
};

const theme = extendTheme({
  components: {
    Steps: CustomSteps
  }
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to Moviola!</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <CookiesProvider>
        <ChakraProvider theme={theme}>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </ChakraProvider>
      </CookiesProvider>
    </>
  );
}

export default CustomApp;
