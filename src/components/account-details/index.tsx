"use client";

import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import ImgUploadIcon from "../../../public/assets/img-upload-icon.svg";
import HomeLogo from "../../../public/assets/profile-home.svg";
import ProfileImage from "../../../public/assets/profile-img.jpg";
import { API } from "@/utils/configs/api";
import { Footer } from "@/features/footer";
import { alertNotification, signOut } from "@/redux/auth/actions";
import { lgaData } from "@/constants";
import { store } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

export const AccoutDetails = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await API.post(`/img/upload`, formData);
        const imageUrl = response.data.imageUrl;
        setImage(imageUrl);
        alertNotification("Image uploaded successfully.", "success");
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };

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
                  <Link href={"/account-details"}>Account Details</Link>
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
        <div className="flex justify-between pt-12 pb-4">
          <div className="flex flex-col items-start">
            <h3 className="text-[#313030] text-xl font-rubik">My Profile</h3>
            <div className="flex items-center gap-6 mt-5">
              <Image
                src={ProfileImage}
                width={120}
                height={120}
                alt="Profile Logo"
                className="rounded-full"
              />
              <div className="flex flex-col items-start">
                <span className="text-xl text-gray-600">Ibrahim Kaizen</span>
                <span className="text-sm text-gray-500">CEO</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end">
            <button className="bg-white px-3 py-1 rounded-md text-[#4b4a4a] font-telex font-medium">
              Cancel
            </button>
            <button className="bg-[#0c691f] px-3 py-1 rounded-md text-[#fff] font-telex font-medium">
              Save
            </button>
          </div>
        </div>
        <div className="mt-6 pb-[10%]">
          <form className="w-full">
            <div className="border-t border-b border-gray-300 py-4">
              <div className="flex items-start justify-between w-[80%]">
                <label
                  htmlFor="first_name"
                  className="text-[#525151] font-rubik text-lg"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="w-[25rem] border-none rounded-md pr-[10rem]"
                  value={`${`Ibrahim`}`}
                />
              </div>
            </div>
            <div className="border-b border-gray-300 py-4">
              <div className="flex items-start justify-between w-[80%]">
                <label
                  htmlFor="last_name"
                  className="text-[#525151] font-rubik text-lg"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="w-[25rem] border-none rounded-md pr-[10rem]"
                  value={`${`Kaizen`}`}
                />
              </div>
            </div>
            <div className="border-b border-gray-300 py-4">
              <div className="flex items-start justify-between w-[80%]">
                <label
                  htmlFor="email"
                  className="text-[#525151] font-rubik text-lg"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-[25rem] border-none rounded-md pr-[10rem]"
                  value={`${`iboladeji@gmail.com`}`}
                  disabled
                />
              </div>
            </div>
            <div className="border-b border-gray-300 py-4">
              <div className="flex items-start justify-between w-[80%]">
                <label
                  htmlFor="lga"
                  className="text-[#525151] font-rubik text-lg"
                >
                  LGA
                </label>
                <input
                  type="text"
                  id="lga"
                  className="w-[25rem] border-none rounded-md pr-[10rem]"
                  value={`${`Agege`}`}
                />
              </div>
            </div>
            <div className="border-b border-gray-300 py-4">
              <div className="flex items-start justify-between w-[80%]">
                <label
                  htmlFor="phone_number"
                  className="text-[#525151] font-rubik text-lg"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phone_number"
                  className="w-[25rem] border-none rounded-md"
                  value={`${`08134456576`}`}
                />
              </div>
            </div>
            <div className="border-b border-gray-300 py-4">
              <div className="flex items-start justify-between w-[80%]">
                <label
                  htmlFor="gender"
                  className="text-[#525151] font-rubik text-lg"
                >
                  Gender
                </label>
                <input
                  type="text"
                  id="gender"
                  className="w-[25rem] border-none rounded-md"
                  value={`${`Male`}`}
                />
              </div>
            </div>
            <div className="flex justify-start mt-10">
              <div className="flex items-center gap-2">
                <button className="bg-white text-[#525151] font-rubik px-3 py-1 rounded-md">
                  Cancel
                </button>
                <button className="bg-[#0c691f] text-white font-rubik px-3 py-1 rounded-md">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

{
  /* <div className="border-b border-gray-300 py-4">
  <div className="flex items-start justify-between w-[80%]">
    <label
      htmlFor="bio"
      className="text-[#525151] font-rubik text-lg flex flex-col"
    >
      <span>User Photo</span>
      <span className="text-sm italic">
        This will be displayed on your profile.
      </span>
    </label>
    <div className="flex items-center justify-center gap-5">
      <div className="size-36 bg-gray-500 rounded-full"></div>
      <div
        className="flex flex-col justify-center items-center gap-2 h-fit max-w-sm mx-auto bg-[#fff] rounded-lg cursor-pointer p-5"
        onClick={() => fileRef.current && fileRef.current.click()}
      >
        <Image
          src={ImgUploadIcon}
          width={50}
          height={50}
          alt="Upload Icon"
          className=""
        />
        {image && (
          <Image
            src={image}
            width={40}
            height={40}
            alt="Uploaded Image"
            className="size-10 object-cover rounded-full"
          />
        )}
        <div className="flex flex-col items-center">
          <span className="text-gray-500 text-xs">
            Click to upload or drag and drop
          </span>
          <span className="text-gray-500 text-xs">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </span>
        </div>
        <input type="file" ref={fileRef} onChange={handleImageUpload} hidden />
      </div>
    </div>
  </div>
</div>; */
}

{
  /* <div className="border-b border-gray-300 py-4">
  <div className="flex items-start justify-between w-[80%]">
    <label htmlFor="gender" className="text-[#525151] font-rubik text-lg">
      Gender
    </label>
    <select
      id="gender"
      className="w-[25rem] border-none rounded-md text-gray-500"
    >
      <option value="Male" defaultValue="Male">
        Male
      </option>
      <option value="Female">Female</option>
    </select>
  </div>
</div>; */
}
