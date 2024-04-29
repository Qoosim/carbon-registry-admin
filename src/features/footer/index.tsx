"use client";

import Image from "next/image";
import Link from "next/link";
import LasepaLogo from "../../../public/assets/lasepa-logo.jpeg";

export const Footer = () => {
  return (
    <>
      <footer className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-between px-8 py-5 bg-[#fff] rounded-lg">
        <Image
          src={LasepaLogo}
          width={150}
          height={150}
          alt="Lasepa Logo"
          className=""
        />
        <div className="flex items-center gap-6 text-base text-gray-700 font-telex">
          <Link href={"#"}>Terms of Service</Link>
          <Link href={"#"}>Documents</Link>
          <Link href={"#"}>Contact Us</Link>
        </div>
        <span className=" text-base text-gray-700 font-telex italic">
          &copy; 2024. All Right Reserved
        </span>
      </footer>
    </>
  );
};
