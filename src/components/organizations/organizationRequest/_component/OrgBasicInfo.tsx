"use client";

import React, { useEffect, useState } from "react";
import { orgBasicInfoHeaderData } from "@/constants";
import Link from "next/link";
import { AdminHeader } from "@/components/adminHeader";
import { Footer } from "@/features/footer";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

interface Org {
  OrgType: string;
  Name: string;
  RegNo: string;
  Industry: string;
  Address: string;
  Website: string;
  Status: string;
  LGA: string;
  id: string;
}

export const OrgBasicInfo = () => {
  const [org, setOrg] = useState<Org | null>(null);

  const param = useParams();
  const { orgId } = param as any;

  const orgList = useAppSelector((state) => state.orgList.orgList);

  useEffect(() => {
    if (orgId) {
      const selectedOrg = orgList.find((org: any) => org.id === orgId);
      setOrg(selectedOrg || null);
    }
  }, [orgId, orgList]);

  if (!org) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="relative p-8 bg-[#ebecf4] w-full min-h-screen">
        <AdminHeader />
        <div className="p-8">
          <div className="flex justify-center text-slate-600 text-lg font-telex">
            <h1>Organization Request Basic Information</h1>
          </div>
          <div className="flex justify-center gap-10 mt-6">
            <Link href={`/org-deny-form?orgId=${orgId}`}>
              <button className="text-red-600 text-lg font-telex font-normal outline outline-1 w-[8rem] py-1 rounded-lg">
                Deny
              </button>
            </Link>
            <Link href={`/org-approve-form?orgId=${orgId}`}>
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
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light p-2 text-base text-gray-700">
                        {org.OrgType}
                      </td>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light p-2 text-base text-gray-700">
                        {org.Name}
                      </td>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light p-2 text-base text-gray-700">
                        {org.RegNo}
                      </td>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light p-2 text-base text-gray-700">
                        {org.Industry}
                      </td>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light p-2 text-base text-gray-700">
                        {org.Address}
                      </td>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light p-2 text-base text-gray-700">
                        {org.Website}
                      </td>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light p-2 text-base text-gray-700">
                        {org.Status}
                      </td>
                      <td className="text-clip overflow-x-hidden whitespace-nowrap border border-gray-400 text-center font-light p-2 text-base text-gray-700">
                        {org.LGA}
                      </td>
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
