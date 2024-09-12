import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth V5",
  description: "Full Stack Authentication with Express, NEXT.js 14 and Auth V5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <ToastContainer
            position="bottom-right"
            theme="dark"
            newestOnTop={false}
            stacked={true}
          />
        </body>
      </html>
    </SessionProvider>
  );
}
