"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import LasepaLogo from "../../../public/assets/lasepa-logo.jpeg";
import SettingLogo from "../../../public/assets/setting-logo.svg";
import ProfileAvatar from "../../../public/assets/profile-img.jpg";
import { panels } from "@/constants";
import { signOut } from "@/redux/auth/actions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface SidebarProps {
  children: ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: { user: any }) => state.user);
  const [activeIndex, setActiveIndex] = useState(getInitialActivePanelIndex);

  const router = useRouter();

  function getInitialActivePanelIndex() {
    if (typeof localStorage !== "undefined") {
      const storedIndex = localStorage.getItem("activeIndex");
      return storedIndex ? parseInt(storedIndex) : 0;
    } else {
      return 0;
    }
  }

  const setActivePanel = (panelIndex: number) => {
    setActiveIndex(panelIndex);
  };

  useEffect(() => {
    localStorage.setItem("activeIndex", activeIndex.toString());
  }, [activeIndex]);

  const activePanelStyle = (panelIndex: number) =>
    panelIndex === activeIndex
      ? "text-white bg-[#204c39]"
      : "text-gray-600 bg-transparent";

  const handleLogout = () => {
    dispatch(signOut());
    localStorage.removeItem("userData");
    router.push("/");
  };

  return (
    <section>
      <div className="fixed hidden min-h-screen sm:block h-full p-8 bg-[#0c691f] sm:w-[24%] lg:w-[20%]">
        <div className="flex flex-col h-full">
          <div>
            <Link
              href="/"
              className="flex justify-center items-center gap-2 my-7 pb-8"
            >
              <Image
                src={LasepaLogo}
                width={200}
                height={200}
                alt="Lasepa Logo"
                className="rounded-lg"
              />
            </Link>
            <div className="flex flex-col justify-between h-[calc(100vh-12rem)]">
              <div className="flex flex-col gap-2">
                {panels?.map((panelItem, panelIndex) => (
                  <Link href={`/${panelItem.url}`} key={panelIndex}>
                    <div
                      className={`flex gap-2 items-center cursor-pointer py-2 px-3 rounded-lg ${activePanelStyle(
                        panelIndex
                      )}`}
                      onClick={() => setActivePanel(panelIndex)}
                    //   style={
                    //     panelIndex === panels.length - 1
                    //       ? { marginTop: "2.5rem" }
                    //       : {}
                    //   }
                    >
                      <span className="text-md text-[#fff] whitespace-nowrap">
                        {panelItem.text}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div>
                <div className="">
                  <div className="border-b border-gray-400 pb-3">
                    <div className="px-3">
                      <Link href={`/`} className="flex items-center gap-2">
                        <Image
                          src={SettingLogo}
                          width={25}
                          height={25}
                          alt="Setting Logo"
                          className=""
                        />
                        <span className="text-md text-[#fff] whitespace-nowrap">
                          Profile Settings
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-[1rem] cursor-pointer">
                    <Image
                      src={ProfileAvatar}
                      width={50}
                      height={50}
                      alt="Profile Avatar"
                      className="rounded-full"
                    />
                    <div className="flex flex-col items-start">
                      <h4 className="text-[#fff] font-semibold">
                        {`${user?.first_name ?? ""} ${user?.last_name ?? ""}` ||
                          "Guest"}
                      </h4>

                      <p className="text-sm text-slate-100">
                        {user?.email ?? ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="w-[calc(100% - 20%)] ml-0 sm:ml-[24%] lg:ml-[20%]">
        {children}
      </main>
    </section>
  );
};
