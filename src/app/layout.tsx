import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/features/auth/_components/storeProvider";
import { Header } from "@/features/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "LASEPA",
  description: "LASEPA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <header>
            <Header />
          </header>
          <main className="font-notoSans">
            {children}
            <ToastContainer closeButton={false} hideProgressBar />
          </main>
        </body>
      </html>
    </StoreProvider>
  );
}
