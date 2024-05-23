"use client";

import React, { useState } from "react";
import Image from "next/image";
import { store } from "@/redux/store";
import { signOut } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import HomeLogo from "../../../public/assets/profile-home.svg";
import ProfileImage from "../../../public/assets/profile-img.jpg";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const AdminHeader = () => {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const dispatch = store.dispatch;
  const router = useRouter();

  const { user } = useAppSelector((state) => state.user);

  const handleAvatarClick = () => {
    setIsLogoutVisible((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(signOut());
    localStorage.removeItem("userData");
    router.push("/");
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-10">
          <div>
            <Image
              src={HomeLogo}
              width={20}
              height={20}
              alt="Home Logo"
              className=""
            />
          </div>
          <div className="flex items-center gap-10 font-rubik">
            <span className="cursor-pointer">
              <Link href={"/dashboard"}>Home</Link>
            </span>
            <span className="cursor-pointer">
              <Link href={"/org-requests"}>Organizations</Link>
            </span>
            <span className="cursor-pointer">
              {" "}
              <Link href={"/project-requests"}>Projects</Link>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          {user && (
            <div>
              <h3>Hi {user.first_name}</h3>
            </div>
          )}
          <div className="relative">
            <Image
              src={ProfileImage}
              width={30}
              height={30}
              alt="Profile Image"
              className="object-cover rounded-full cursor-pointer"
              onClick={handleAvatarClick}
            />
            {isLogoutVisible && (
              <div className="absolute right-0 mt-2 w-[5rem] bg-white border rounded shadow-lg">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
