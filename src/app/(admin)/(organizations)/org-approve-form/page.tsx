import React, { Suspense } from "react";
import { OrgApproveForm } from "@/components/organizations/orgApproveForm";

const OrgApprovePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrgApproveForm />
    </Suspense>
  );
};

export default OrgApprovePage;
