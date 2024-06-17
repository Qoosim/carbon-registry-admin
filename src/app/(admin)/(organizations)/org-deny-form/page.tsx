import React, { Suspense } from "react";
import { OrgDenyForm } from "@/components/organizations/orgDenyForm";

const OrgDenyPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrgDenyForm />;
    </Suspense>
  );
};

export default OrgDenyPage;
