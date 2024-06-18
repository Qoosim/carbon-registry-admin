import React, { Suspense } from "react";
import { ProjectDenyForm } from "@/components/projects/projDenyForm";

const ProjectDenyPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectDenyForm />;
    </Suspense>
  );
};

export default ProjectDenyPage;
