"use client";
import Workflowform from "@/components/forms/workflow-form";
import CustomModal from "@/components/global/custom-modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  credits: string;
};

const WorkflowButton = ({ credits }: Props) => {
  const { setOpen, setClose } = useModal();

  const handleClick = () => {
    setOpen(
      <CustomModal
        title="Create a Workflow Automation"
        subtitle="Workflows are a powerfull that help you automate tasks."
      >
        <Workflowform />
      </CustomModal>
    );
  };

  return (
    <Button
      size={"icon"}
      {...(credits !== "0"
        ? {
            onClick: handleClick,
          }
        : {
            disabled: true,
          })}
    >
      <Plus />
    </Button>
  );
};

export default WorkflowButton;
