// config/index.tsx

import { defaultWagmiConfig, configureChains } from '@web3modal/wagmi/react/config';
import { infuraProvider } from 'wagmi/providers/infura';
import { mainnet, sepolia } from 'wagmi/chains';

// Your WalletConnect Cloud project ID
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// Define the Infura ID for provider configuration
const infuraId = process.env.INFURA_ID;  // Make sure you have this variable in your environment

// Configure chains with Infura as the provider
const { chains, provider } = configureChains(
  [mainnet, sepolia],
  [infuraProvider({ infuraId })]
);

// Create a metadata object
const metadata = {
  name: 'Early Bird',
  description: 'A game where you hunt for and collect worms. As a bird.',
  url: 'https://localhost:3000', // Ensure the URL matches your domain & subdomain
  icons: ['https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmaKqEGonantGEUkEQszqoS5v6Yy3VBwZJ7f5hjHSiYCr5']
};

// Default Wagmi Config setup
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,  // Server-Side Rendering flag
  provider  // Pass the configured provider
});
