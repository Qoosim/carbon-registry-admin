"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LasepaLogo from "../../../public/assets/lasepa-logo.jpeg";
import { useAppSelector } from "@/redux/hooks";
import { MdClose, MdMenu } from "react-icons/md";
import { navItems } from "../../constants";
import { useParams } from "next/navigation";
import { signOut } from "@/redux/auth/actions";
import { store } from "@/redux/store";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { user } = useAppSelector((state) => state.user);

  const [isMobileNav, setMobileNav] = useState(false);

  const router = useRouter();
  const dispatch = store.dispatch;
  const pathname = usePathname() || "";

  //   let notShowHeader = [
  //     "/organization",
  //     "/org-dashboard",
  //     "/dashboard",
  //     "/insights",
  //     "/insights/create",
  //     "/insights/inner-pro-details",
  //     "/settings",
  //     "/projects",
  //     `/company/${orgId}/projects`,
  //     `/company/${orgId}/projects/onboarding`,
  //   ];

  //   if (orgId) {
  //     notShowHeader = [
  //       ...notShowHeader,
  //       `/company/${orgId}/projects`,
  //       `/company/${orgId}/projects/onboarding`,
  //     ];
  //   }

  //   const hideHeader = notShowHeader.includes(pathname);

  const handleLogout = () => {
    dispatch(signOut());
    router.push("/");
  };

  const onClose = () => setMobileNav((prev) => !prev);

  return (
    <>
      <header className="fixed flex justify-between px-6 py-2 border-b shadow-lg bg-[#fff] z-40 w-full">
        <Link href={`/`}>
          <Image
            src={LasepaLogo}
            width={250}
            height={250}
            alt="ICR Logo"
            className="hidden sm:block"
          />
          <Image
            src={LasepaLogo}
            width={180}
            height={180}
            alt="ICR Logo"
            className="sm:hidden"
          />
        </Link>
        <nav className="hidden sm:flex items-center gap-16 md:gap-6 lg:gap-16 text-[#000]">
          <ul className="flex items-center md:text-sm lg:text-lg whitespace-nowrap gap-6 font-poppins tracking-wide font-semibold">
            {navItems.map((item) => {
              return (
                <li key={item.name}>
                  <Link href={item.link} className="mb-5">
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          {user ? (
            <div
              className="flex items-center gap-2 font-normal ml-16 text-red-500 outline outline-1 px-3 py-1 rounded-lg hover:opacity-60"
              onClick={handleLogout}
            >
              <button className="italic">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2 font-semibold font-poppins tracking-wider">
              <Link
                href="/login"
                className="hover:bg-gray-200 px-4 py-2 rounded-md text-base font-semibold"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-[#0c691f] px-4 py-2 rounded-md text-white text-base"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
        <button
          onClick={onClose}
          type="button"
          className="block px-2 sm:hidden"
        >
          <MdMenu className="text-[32px]" />
        </button>
        {isMobileNav && <MobileNav close={onClose} />}
      </header>
    </>
  );
};

//
// Mobile Version

export const MobileNav = ({ close }: { close: () => void }) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = store.dispatch;
  const router = useRouter();

  const handleLogout = () => {
    dispatch(signOut());
    router.push("/");
    close();
  };

  return (
    <div
      role="button"
      onClick={close}
      className="fixed inset-0 z-[100] h-full w-full"
    >
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md" />

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        role="button"
        className="modal swipeIn absolute right-0 top-0 flex h-full w-[75%] flex-col items-start justify-start rounded-tl-2xl border-l bg-white p-6 shadow-lg sm:w-[300px] transition-all duration-500 ease-out"
      >
        <div className="flex w-full flex-col items-start justify-start gap-y-2">
          <div className="flex w-full items-end justify-end">
            <button type="button" onClick={close} className="">
              <MdClose className="text-xl text-[#0c691f]" />
            </button>
          </div>
          {navItems.map((item) => {
            return (
              <Link
                onClick={close}
                key={item.name}
                href={item?.link}
                className="mb-5"
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="mt-4 flex w-full flex-col gap-4 font-sora font-semibold ">
          {user ? (
            <div
              className="flex justify-center items-center gap-2 font-normal text-red-500 outline outline-1 px-3 py-1 rounded-lg hover:opacity-60"
              onClick={handleLogout}
            >
              <button className="italic">Logout</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link href="/login">
                <button
                  onClick={close}
                  type="button"
                  className="w-full bg-white px-4 py-3 text-lg font-semibold text-[#7780A1] shadow-inner outline outline-1"
                >
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button
                  onClick={close}
                  type="button"
                  className="w-full bg-[#0c691f] px-4 py-3 text-lg font-semibold text-white shadow-inner"
                >
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
