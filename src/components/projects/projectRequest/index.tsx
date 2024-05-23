"use client";

import React, { useState } from "react";
import { Footer } from "@/features/footer";
import { fakeDataProject } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { store } from "@/redux/store";
import { signOut } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
// import { AdminHeader } from "../adminHeader";
import HomeLogo from "../../../../public/assets/profile-home.svg";
import ProfileImage from "../../../../public/assets/profile-img.jpg";
import { useRouter } from "next/navigation";

export const ProjectRequest = () => {
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
        {/* <AdminHeader /> */}
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
                <span className="cursor-pointer">
                  <Link href={"/dashboard"}>Home</Link>
                </span>
                <span className="cursor-pointer">
                  <Link href={"/org-requests"}>Organizations</Link>
                </span>
                <span className="cursor-pointer bg-white px-3 py-1 rounded-md">
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
          <h1 className="font-rubik font-semibold text-lg text-center text-gray-500 capitalize pt-12 pb-4">
            List of Project Requests
          </h1>
          <div>
            <table className="table-auto w-full border-separate border-spacing-y-4">
              <thead>
                <tr>
                  <th className="min-w-40 text-left">S/N</th>
                  <th className="min-w-40 text-left">Organization ID</th>
                  <th className="min-w-40 text-left">Project ID</th>
                  <th className="min-w-40 text-left">Account Holder</th>
                  <th className="min-w-40 text-left">Organization Name</th>
                  <th className="min-w-40 text-left">Project Info</th>
                </tr>
              </thead>
              <tbody className="mt-5">
                {fakeDataProject.map((data) => (
                  <tr key={data.id} className="py-5">
                    <td>{data.id}</td>
                    <td className="text-green-700">
                      <Link href={"#"}>{data.orgId}</Link>
                    </td>
                    <td className="text-green-700">
                      <Link href={"/project-basic-info"}>{data.projectId}</Link>
                    </td>
                    <td>{data.accountHolder}</td>
                    <td>{data.orgName}</td>
                    <td className="text-green-700">
                      <Link href={"/project-basic-info"}>{data.projectInfo}</Link>
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
