import React from "react";
import { orgBasicInfoBodyData, orgBasicInfoHeaderData } from "@/constants";
import Link from "next/link";
import { AdminHeader } from "@/components/adminHeader";
import { Footer } from "@/features/footer";

export const OrgBasicInfo = () => {
  return (
    <>
      <div className="relative p-8 bg-[#ebecf4] w-full min-h-screen">
        <AdminHeader />
        <div className="p-8">
          <div className="flex justify-center text-slate-600 text-lg font-telex">
            <h1>Organization Request Basic Information</h1>
          </div>
          <div className="flex justify-center gap-10 mt-6">
            <Link href={"/org-deny-form"}>
              <button className="text-red-600 text-lg font-telex font-normal outline outline-1 w-[8rem] py-1 rounded-lg">
                Deny
              </button>
            </Link>
            <Link href={"/org-approve-form"}>
              <button className="text-green-600 text-lg font-telex font-normal outline outline-1 w-[8rem] py-1 rounded-lg">
                Approve
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto pt-10">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden">
                <table className="min-w-full table-auto border-spacing-y-2 border-spacing-x-0.5">
                  <thead className="bg-gray-100">
                    <tr>
                      {orgBasicInfoHeaderData.map((item, index) => (
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
                      {orgBasicInfoBodyData.map((item, index) => (
                        <td
                          key={index}
                          className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light p-2 text-base text-gray-700"
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
        </div>
        <Footer />
      </div>
    </>
  );
};
