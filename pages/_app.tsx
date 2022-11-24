import '../styles/globals.css';
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../theme';

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        {/* <ChakraProvider theme={theme}>
        </ChakraProvider> */}
        <MoralisProvider
          serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL ?? ''}
          appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID ?? ''}
        >
          <Component {...pageProps} />
        </MoralisProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
