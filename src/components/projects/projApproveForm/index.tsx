"use client";

import React, { useState } from "react";
import { Footer } from "@/features/footer";
import Link from "next/link";
import Image from "next/image";
import { store } from "@/redux/store";
import { signOut } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import HomeLogo from "../../../../public/assets/profile-home.svg";
import ProfileImage from "../../../../public/assets/profile-img.jpg";
import BackArrow from "../../../../public/assets/back-arrow.svg";
import { useRouter, useSearchParams } from "next/navigation";

export const ProjectApproveForm = () => {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const dispatch = store.dispatch;
  const router = useRouter();
  const params = useSearchParams()

  const projId = params.get('projectId')

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
      <div className="relative p-8 bg-[#ebecf4] w-full min-h-screen overflow-y-auto">
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
        <div className="mt-[1%] w-fit float-end">
          <Link
            href={`/projects/${projId}`}
            className="flex items-center gap-2"
          >
            <Image
              src={BackArrow}
              width={15}
              height={15}
              alt="Back Arrow Logo"
              className=""
            />
            <span className="text-base text-gray-600">Back to project Info</span>
          </Link>
        </div>
        <div className="max-w-[90%] sm:max-w-[70%] mx-auto w-[85%] sm:w-[60%] lg:w-[50%] pt-12 pb-24 min-h-full">
          <div className="text-center pb-6">
            <h1 className="text-2xl font-telex font-normal text-gray-700">
              Approval Form for Creating Projects
            </h1>
            <span className="text-sm italic text-gray-600">
              Kindly state the reasons for approving this project in the form
              below
            </span>
          </div>
          <div>
            <form>
              <div className="flex flex-col justify-start gap-2 mb-2">
                <label
                  htmlFor="org_id"
                  className="font-medium text-[#6a7281] text-sm"
                >
                  Organization ID
                </label>
                <input
                  type="text"
                  id="org_id"
                  placeholder="Org ID"
                  className="p-2 bg-[#fff] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent border"
                />
              </div>
              <div className="flex flex-col justify-start gap-2 mb-2">
                <label
                  htmlFor="proj_id"
                  className="font-medium text-[#6a7281] text-sm"
                >
                  Project ID
                </label>
                <input
                  type="text"
                  id="proj_id"
                  placeholder="Project ID"
                  className="p-2 bg-[#fff] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent border"
                />
              </div>
              <div className="flex flex-col justify-start gap-2 mb-2">
                <label
                  htmlFor="title"
                  className="font-medium text-[#6a7281] text-sm"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className="p-2 bg-[#fff] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent border"
                />
              </div>
              <div className="flex flex-col justify-start gap-2 mb-2">
                <label
                  htmlFor="reasons"
                  className="font-medium text-[#6a7281] text-sm"
                >
                  Reasons
                </label>
                <textarea
                  name="reasons"
                  id="reasons"
                  placeholder="Statement of approval..."
                  className="p-2 bg-[#fff] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent border"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#117031] w-full p-2 rounded-md mt-6 text-white font-semibold hover:opacity-80"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
