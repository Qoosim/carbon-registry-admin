import React, { Suspense } from "react";
import { OtpVerification } from "@/features/auth/otp-verification";

const OtpPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpVerification />;
    </Suspense>
  );
};

export default OtpPage;
