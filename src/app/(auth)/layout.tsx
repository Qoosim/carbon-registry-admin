import type { Metadata } from "next";
import "../globals.css";
import Image from "next/image";
import LasepaLogo from "../../../public/assets/lasepa-logo.jpeg";

export const metadata: Metadata = {
  title: "LASEPA",
  description: "LASEPA",
};

export default function AdminAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-notoSans bg-[#ebedf5] flex flex-col">
      <nav className="pt-12 pl-12">
        <Image
          src={LasepaLogo}
          width={200}
          height={200}
          alt="Lasepa Logo"
          className="rounded-lg"
        />
      </nav>
      <main className="-pt-16">{children}</main>
    </div>
  );
}
