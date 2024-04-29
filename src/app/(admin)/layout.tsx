import "@/app/globals.css";
import { Sidebar } from "@/components/sidebar";
import type { Metadata } from "next";

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
    <div className="">
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
