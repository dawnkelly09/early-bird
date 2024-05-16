
// config/index.tsx

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

// Your WalletConnect Cloud project ID
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

// Create a metadata object
const metadata = {
  name: 'Early Bird',
  description: 'Web3Modal Example',
  url: 'https://localhost:3000', // origin must match your domain & subdomain
  icons: ['https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmaKqEGonantGEUkEQszqoS5v6Yy3VBwZJ7f5hjHSiYCr5']
}

// Create wagmiConfig
const chains = [mainnet, sepolia] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})