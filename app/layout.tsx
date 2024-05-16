import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '../config'
import Web3ModalProvider from '../context'
import ConnectButton from '../app/components/ConnectButton'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Early Bird",
  description: "A game where you hunt for worms. As a bird.",
};

export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider initialState={initialState}>
          <ConnectButton />
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  );
}
