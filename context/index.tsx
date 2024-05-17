'use client'

import React, { ReactNode, useEffect } from 'react'
import { config, projectId } from '../config'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import wagmiClient from '../config/client'  

export default function Web3ModalProvider({
  children,
  initialState
}: {
  children: ReactNode,
  initialState?: State
}) {
  const queryClient = new QueryClient()

  useEffect(() => {
    if (!projectId) throw new Error('Project ID is not defined');

    const modal = createWeb3Modal({
      wagmiConfig: config,
      projectId,
      enableAnalytics: true,
      enableOnramp: true
    });
    console.log("Web3 Modal Created", modal);
  }, []);

  return (
    <WagmiProvider client={wagmiClient} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
