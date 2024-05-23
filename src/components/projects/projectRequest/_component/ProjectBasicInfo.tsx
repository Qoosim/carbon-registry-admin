import React from "react";
import {
  projectBasicInfoBodyData,
  projectBasicInfoHeaderData,
} from "@/constants";
import Link from "next/link";
import { AdminHeader } from "@/components/adminHeader";

export const ProjectBasicInfo = () => {
  return (
    <>
      <div className="relative p-8 bg-[#ebecf4] w-full min-h-screen">
        <AdminHeader />
        <div className="p-8">
          <div className="flex justify-center text-slate-600 text-lg font-telex">
            <h1>Project Request Basic Information</h1>
          </div>
          <div className="flex justify-center gap-10 mt-6">
            <Link href={"/pro-deny-form"}>
              <button className="text-red-600 text-lg font-telex font-normal outline outline-1 w-[8rem] py-1 rounded-lg">
                Deny
              </button>
            </Link>
            <Link href={"/pro-approve-form"}>
              <button className="text-green-600 text-lg font-telex font-normal outline outline-1 w-[8rem] py-1 rounded-lg">
                Approve
              </button>
            </Link>
          </div>
          <div className="overflow-x-scroll mt-6">
            <table className="table-auto border-spacing-y-2 border-spacing-x-0.5">
              <thead>
                <tr>
                  {projectBasicInfoHeaderData.map((item, index) => (
                    <th
                      scope="col"
                      key={index}
                      className="p-2 !w-1/2 shrink-0 border border-gray-600 mx-1 min-w-40 whitespace-nowrap text-slate-600"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {projectBasicInfoBodyData.map((item, index) => (
                    <td
                      key={index}
                      className="text-center text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 font-light py-1.5 text-sm "
                    >
                      {item}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};