import React, { Suspense } from "react";
import { ProjectApproveForm } from "@/components/projects/projApproveForm";

const ProjectApprovePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectApproveForm />
    </Suspense>
  );
};

export default ProjectApprovePage;
