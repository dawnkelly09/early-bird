import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers'



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Early Bird",
  description: "A game where you hunt for worms. As a bird.",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
