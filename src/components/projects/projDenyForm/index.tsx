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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reviewSchema } from "@/features/auth/utils/validation";
import { reviewProjectDeny } from "@/features/reviews/actions";
import { ErrorMessage } from "@/features/auth/_components/error-message";

export const ProjectDenyForm = () => {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = store.dispatch;
  const router = useRouter();
  const params = useSearchParams();
  const projId = params.get("projectId");

  const { user } = useAppSelector((state) => state.user);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      TypeID: `${projId}`,
      Description: "",
    },
    resolver: yupResolver(reviewSchema) as any,
  });

  const formData = (data: any) =>
    reviewProjectDeny(data, reset, setIsLoading);

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
            <span className="text-base text-gray-600">
              Back to project Info
            </span>
          </Link>
        </div>
        <div className="max-w-[90%] sm:max-w-[70%] mx-auto w-[85%] sm:w-[60%] lg:w-[50%] pt-12 pb-24">
          <div className="text-center pb-6">
            <h1 className="text-2xl font-telex font-normal text-gray-700">
              Denial Form for Creating Projects
            </h1>
            <span className="text-sm italic text-gray-600">
              Kindly state the reasons for denying this project in the form
              below
            </span>
          </div>
          <div>
            <form onSubmit={handleSubmit(formData)}>
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
                  {...register("TypeID")}
                />
                {errors.TypeID?.message && (
                  <ErrorMessage message={errors.TypeID.message} />
                )}
              </div>
              <div className="flex flex-col justify-start gap-2 mb-2">
                <label
                  htmlFor="desc"
                  className="font-medium text-[#6a7281] text-sm"
                >
                  Reasons
                </label>
                <textarea
                  id="desc"
                  placeholder="State reason(s) for denial..."
                  className="p-2 bg-[#fff] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent border"
                  {...register("Description")}
                ></textarea>
                {errors.Description?.message && (
                  <ErrorMessage message={errors.Description.message} />
                )}
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="bg-[#117031] w-full p-2 rounded-md mt-6 text-white font-semibold hover:opacity-80"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>{" "}
                    Processing...
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
