"use client";

import React, { useEffect, useState } from "react";
import { projectBasicInfoHeaderData } from "@/constants";
import Link from "next/link";
import { AdminHeader } from "@/components/adminHeader";
import { API } from "@/utils/configs/api";
import { alertNotification } from "@/redux/auth/actions";
import { store } from "@/redux/store";

export const ProjectBasicInfo = ({ projectId }: any) => {
  const [projectDetails, setProjectDetails] = useState<any>({});

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const response = await API.get(`/projects/${projectId}`);
        const jsonData = response?.data;
        if (jsonData?.success) {
          setProjectDetails(jsonData.data);
        } else {
          alertNotification(
            "Failed to fetch data.get Please try again.",
            "error"
          );
        }
      } catch (error: any) {
        alertNotification(
          error?.response?.data?.message || "An error occured",
          "error"
        );
      }
    };
    getProjectDetails();
  }, [projectId]);

  return (
    <>
      <div className="relative p-8 bg-[#ebecf4] w-full min-h-screen">
        <AdminHeader />
        <div className="p-8">
          <div className="flex justify-center text-slate-600 text-lg font-telex">
            <h1>Project Request Basic Information</h1>
          </div>
          <div className="flex justify-center gap-10 mt-6">
            <Link href={`/pro-deny-form?projectId=${projectId}`}>
              <button className="text-red-600 text-lg font-telex font-normal outline outline-1 w-[8rem] py-1 rounded-lg">
                Deny
              </button>
            </Link>
            <Link href={`/pro-approve-form?projectId=${projectId}`}>
              <button className="text-green-600 text-lg font-telex font-normal outline outline-1 w-[8rem] py-1 rounded-lg">
                Approve
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto py-10">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden">
                <table className="min-w-full table-auto border-spacing-y-2 border-spacing-x-0.5">
                  <thead className="bg-gray-100">
                    <tr>
                      {projectBasicInfoHeaderData.map((item, index) => (
                        <th
                          scope="col"
                          key={index}
                          className="p-2 border border-gray-600 mx-1 whitespace-nowrap text-slate-600"
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 px-3 text-base">
                        {projectDetails.Headline}
                      </td>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 px-3 text-base">
                        {projectDetails.FullName}
                      </td>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 px-3 text-base">
                        {projectDetails.ProjectType}
                      </td>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 px-3 text-base">
                        {projectDetails.Website}
                      </td>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 px-3 text-base">
                        {projectDetails.GHGProgram}
                      </td>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 px-3 text-base">
                        {projectDetails.Sector}
                      </td>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light py-1.5 px-3 text-base">
                        {projectDetails.ProjectStatus}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div>
            <Link href={`/project-requests`} className="border border-gray-700 py-2 px-8 rounded-lg">Back</Link>
          </div>
        </div>
      </div>
    </>
  );
};
