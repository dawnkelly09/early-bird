import { configureChains, createClient, defaultChains } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { InjectedConnector } from 'wagmi/connectors/injected';

const infuraId = process.env.INFURA_ID;  // Ensure you have an Infura project ID

const { chains, provider } = configureChains(defaultChains, [
  infuraProvider({ infuraId })
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider
});