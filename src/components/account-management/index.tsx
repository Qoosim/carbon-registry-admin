"use client";

import React, { useState } from "react";
import { fakeDataHolder, fakeDataOrg } from "@/constants";
import { Footer } from "@/features/footer";
import { signOut } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HomeLogo from "../../../public/assets/profile-home.svg";
import ProfileImage from "../../../public/assets/profile-img.jpg";

export const AccountManagement = () => {
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
    <>
      <div className="relative p-8 bg-[#ebecf4] w-full min-h-screen">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-10">
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
                <span className="cursor-pointer bg-white px-3 py-1 rounded-md">
                  <Link href={"/account-management"}>Account Management</Link>
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
        <div>
          <h1 className="font-rubik font-semibold text-lg text-center text-gray-500 capitalize pt-12 pb-4">
            List of Opened Accounts
          </h1>
          <div>
            <table className="table-auto w-full border-separate border-spacing-y-1">
              <thead>
                <tr>
                  <th className="text-left p-2 !w-1/3 shrink-0 border border-gray-600 mx-1 whitespace-nowrap text-slate-600">
                    S/N
                  </th>
                  <th className="text-left p-2 !w-1/3 shrink-0 border border-gray-600 mx-1 whitespace-nowrap text-slate-600">
                    Account Holder
                  </th>
                  <th className="text-left p-2 !w-1/3 shrink-0 border border-gray-600 mx-1 whitespace-nowrap text-slate-600">
                    Account Information
                  </th>
                </tr>
              </thead>
              <tbody className="mt-5 border border-red-500">
                {fakeDataHolder.map((data) => (
                  <tr key={data.id} className="py-5">
                    <td className="text-left text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 font-light py-1.5 px-2 text-base">
                      {data.id}
                    </td>
                    <td className="text-left text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 font-light py-1.5 px-2 text-base">
                      {data.accountHolder}
                    </td>
                    <td className="text-green-700 text-left text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 font-normal py-1.5 px-2 text-base">
                      <Link href={"/account-details"}>{data.holderInfo}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
