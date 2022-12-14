import { Connector, useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { MagicConnectConnector } from '@everipedia/wagmi-magic-connector';
import { Option } from '../../elements';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import apiPost from '../../../utils/apiPost';
import styles from './Authentication.module.css';

const wallets = [
  {
    name: 'Metamask',
    logoPath: '/assets/wallets/metamask.svg',
    connector: new MetaMaskConnector(),
  },
  {
    name: 'Coinbase Wallet',
    logoPath: '/assets/wallets/coinbase.svg',
    disabled: true,
  },
  {
    name: 'WalletConnect',
    logoPath: '/assets/wallets/walletconnect.svg',
    connector: new WalletConnectConnector({
      options: { rpc: ['https://mainnet.infura.io/v3/84842078b09946638c03157f83405213'] },
    }),
  },
  {
    name: 'Injected',
    logoPath: '/assets/wallets/eth.svg',
    connector: new InjectedConnector(),
  },
  {
    name: 'MagicLink',
    logoPath: '/assets/wallets/magiclink.svg',
    connector: new MagicConnectConnector({
      options: {
        apiKey: process.env.NEXT_PUBLIC_MAGICLINK_API_KEY ?? '',
      },
    }),
  },
];
const Authentication = () => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  const handleAuth = async (connector?: Connector, disabled?: boolean) => {
    if (disabled) {
      // eslint-disable-next-line no-alert
      alert('Setup it first in the Authentication.tsx');
      return;
    }

    if (isConnected) {
      await disconnectAsync();
    }

    let useConnectorChain = true
    let customChain = 0
    if (connector instanceof MagicConnectConnector) {
      useConnectorChain = false
      customChain = 1
    }

    const { account, chain } = await connectAsync({ connector });

    const userData = { address: account, chain: useConnectorChain ? chain.id : customChain, networkType: 'evm' };

    const { message } = await apiPost('/auth/request-message', userData);

    const signature = await signMessageAsync({ message });

    try {
      await signIn('credentials', { message, signature, redirect: false });
      // redirects to main page
      push('/');
    } catch (e) {
      // Do nothing
    }
  };

  return (
    <div className={styles.auth}>
      <h3 className={styles.title}>Web3 Authentication</h3>
      <div className={styles.options}>
        {wallets.map(({ name, logoPath, connector, disabled }) => {
            const connectorInterface = connector ? connector as Connector : undefined
            return (
              <Option
                disabled={disabled}
                key={name}
                logoPath={logoPath}
                name={name}
                onClick={() => handleAuth(connectorInterface, disabled)}
              />
            )
          }
        )}
      </div>
    </div>
  );
};

export default Authentication;