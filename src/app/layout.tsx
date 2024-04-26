import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {ReduxProvider} from "@/redux/provider"
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learnea",
  description: "Taking humanity to the next level",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
        {children}
        </ReduxProvider>
        </body>
    </html>
  );
}
