import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Alert } from 'src/UI/Alert';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <Alert />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
