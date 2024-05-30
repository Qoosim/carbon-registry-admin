import type { Metadata } from "next";
import "../globals.css";
import Image from "next/image";
import LasepaLogo from "../../../public/assets/lasepa-logo.jpeg";

export const metadata: Metadata = {
  title: "LASEPA",
  description: "LASEPA",
};

export default function AdminAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-notoSans bg-[#ebedf5] flex flex-col w-full min-h-screen overflow-x-hidden">
      <nav className="pt-6 pl-6 sm:pt-12 sm:pl-12">
        <Image
          src={LasepaLogo}
          width={200}
          height={200}
          alt="Lasepa Logo"
          className="rounded-lg"
        />
      </nav>
      <main className="flex justify-center items-center pt-8 sm:pt-10">
        {children}
      </main>
    </div>
  );
}
