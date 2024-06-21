import { getWorkflows } from "@/lib/backendactions";
import React from "react";
import { Workflow } from "./workflow";
import Link from "next/link";

const WorkflowList = async () => {
  const workflows = await getWorkflows();

  return (
    <div>
      {workflows.map((workflow) => (
            <Workflow
              title={workflow.name}
              desc={workflow.description}
              id={workflow.id}
              publish={workflow.publish}
            />
      ))}
    </div>
  );
};
export default WorkflowList;
