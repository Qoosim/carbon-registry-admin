"use client";

import React, { useState, useEffect, FC } from "react";
import { Footer } from "@/features/footer";
import { API } from "@/utils/configs/api";
import Link from "next/link";
import Image from "next/image";
import { store } from "@/redux/store";
import { signOut } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import HomeLogo from "../../../../public/assets/profile-home.svg";
import LCRLogo from "../../../../public/lasepa.jpeg";
import ProfileImage from "../../../../public/assets/profile-img.jpg";
import { useRouter } from "next/navigation";
import { MobileNav } from "@/components/mobileNav";
import { MdMenu } from "react-icons/md";
import {
  setIsLoading,
  setOrgListError,
  setOrgList,
} from "@/redux/auth/allOrgsSlice";

interface Org {
  id: string;
  UserID: string;
  Name: string;
  Website: string;
}

interface OrgListProps {
  orgList: Org[]
}

export const OrganizationRequest: FC<OrgListProps> = () => {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [isMobileNav, setMobileNav] = useState(false);
  const [fetchedOrg, setFetchedOrg] = useState<Org[]>([]);

  const { user } = useAppSelector((state) => state.user);

  const dispatch = store.dispatch;
  const router = useRouter();

  useEffect(() => {
    const getAllOrgs = async () => {
      try {
        dispatch(setIsLoading(true));
        const response = await API.get("/org/list/all");
        if (response?.data?.success) {
          const jsonData: Org[] = response.data.data;
          dispatch(setOrgList(jsonData));
          setFetchedOrg(jsonData);
          dispatch(setIsLoading(false));
        }
      } catch (error) {
        dispatch(setIsLoading(false));
        dispatch(setOrgListError("An error occured while fetching data"));
      }
    };
    getAllOrgs();
  }, [dispatch]);

  console.log("Org List:", fetchedOrg);

  const handleAvatarClick = () => {
    setIsLogoutVisible((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(signOut());
    localStorage.removeItem("userData");
    router.push("/");
  };

  const onClose = () => setMobileNav((prev) => !prev);

  return (
    <>
      <div className="relative p-8 bg-[#ebecf4] w-full min-h-screen">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-0 sm:gap-10 w-full">
              <div>
                <Image
                  src={HomeLogo}
                  width={30}
                  height={30}
                  alt="Home Logo"
                  className="hidden sm:block"
                />
              </div>
              <div className="hidden sm:flex items-center gap-5 sm:gap-10 font-rubik">
                <span className="cursor-pointer">
                  <Link href={"/dashboard"} className="text-sm sm:text-base">
                    Home
                  </Link>
                </span>
                <span className="cursor-pointer bg-white px-3 py-1 rounded-md">
                  <Link href={"/org-requests"} className="text-sm sm:text-base">
                    Organizations
                  </Link>
                </span>
                <span className="cursor-pointer">
                  <Link
                    href={"/project-requests"}
                    className="text-sm sm:text-base"
                  >
                    Projects
                  </Link>
                </span>
              </div>
              <div className="flex items-center justify-between w-full">
                <div>
                  <Image
                    src={LCRLogo}
                    width={40}
                    height={40}
                    alt="Home Logo"
                    className="sm:hidden"
                  />
                </div>
                <button
                  onClick={onClose}
                  type="button"
                  className="flex px-2 sm:hidden"
                >
                  <MdMenu className="text-[32px]" />
                </button>
              </div>
              {isMobileNav && <MobileNav close={onClose} />}
            </div>
            <div className="hidden items-center gap-5 sm:inline-flex">
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
            List of Organization Requests
          </h1>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden">
                <table className="min-w-full table-auto border-spacing-y-2 border-spacing-x-0.5">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="p-2 border border-gray-600 mx-1 whitespace-nowrap text-slate-600"
                      >
                        S/N
                      </th>
                      <th
                        scope="col"
                        className="p-2 border border-gray-600 mx-1 whitespace-nowrap text-slate-600"
                      >
                        Org ID
                      </th>
                      <th
                        scope="col"
                        className="p-2 border border-gray-600 mx-1 whitespace-nowrap text-slate-600"
                      >
                        Account Holder
                      </th>
                      <th
                        scope="col"
                        className="p-2 border border-gray-600 mx-1 whitespace-nowrap text-slate-600"
                      >
                        Organization Name
                      </th>
                      <th
                        scope="col"
                        className="p-2 border border-gray-600 mx-1 whitespace-nowrap text-slate-600"
                      >
                        Organization Info
                      </th>
                    </tr>
                  </thead>
                  <tbody className="mt-5">
                    {fetchedOrg?.map((org, index) => {
                      return (
                        <tr key={org.id} className="py-5">
                          <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 px-3 text-base">
                            {index + 1}
                          </td>
                          <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 px-3 text-base text-green-700">
                            <Link href={"/org-basic-info"}>{org.id}</Link>
                          </td>
                          <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 px-3 text-base">
                            {org.UserID}
                          </td>
                          <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 px-3 text-base">
                            {org.Name}
                          </td>
                          <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 px-3 text-base text-green-700">
                            <Link href={"/org-basic-info"}>
                              {org.Website}
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
