import "./globals.css";
import { Inter } from "next/font/google";
// import Head from 'next/head';
import { ToastContainer } from "react-toastify";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notorietystr",
  description: "Boost your notoriety on nostr with.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
