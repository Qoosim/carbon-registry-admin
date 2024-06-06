import React from "react";
import { ProjectBasicInfo } from "@/components/projects/projectRequest/_component/ProjectBasicInfo";

const Page = ({ params }: { params: { projectId: string } }) => {
  return (
    <div>
      <ProjectBasicInfo projectId={params.projectId} />
    </div>
  );
};

export default Page;
