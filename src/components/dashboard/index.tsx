"use client";

import React, { useState } from "react";
import { Footer } from "@/features/footer";
import Link from "next/link";

import Image from "next/image";
import { store } from "@/redux/store";
import { signOut } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import HomeLogo from "../../../public/assets/profile-home.svg";
import ProfileImage from "../../../public/assets/profile-img.jpg";
import { useRouter } from "next/navigation";

export const AdminDashboard = () => {
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
                  <Link href={"/dashboard"}>Home</Link>
                </span>
                <span className="cursor-pointer">
                  <Link href={"/org-requests"}>Organizations</Link>
                </span>
                <span className="cursor-pointer">
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
        <div>
          <h1 className="font-rubik font-semibold text-2xl text-center text-gray-500 capitalize py-11">
            Pending Requests for Verification
          </h1>
          <div className="flex justify-center">
            <table className="table-auto border-spacing-y-2 border-spacing-x-0.5">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="p-2 !w-1/2 shrink-0 border border-gray-600 mx-1 min-w-96 whitespace-nowrap text-slate-600"
                  >
                    Organizations
                  </th>
                  <th
                    scope="col"
                    className="p-2 !w-1/2 shrink-0 border border-gray-600 mx-1 min-w-96 whitespace-nowrap text-slate-600"
                  >
                    Projects
                  </th>
                </tr>
              </thead>
              <tbody className="mt-5">
                <tr>
                  <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 text-base text-green-600">
                    <Link href={"/org-requests"}>10 awaiting review</Link>
                  </td>
                  <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 text-base text-green-600">
                    <Link href={"/project-requests"}>20 awaiting review</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
