"use client";

import React, { useEffect, useState } from "react";
import { ModeButton } from "@/components/ui/toggle-mode-button";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/clerk-react";
import { getWorkFlowTitle } from "@/lib/backendactions";


function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const Navbar = () => {
  const pathname = usePathname();
  const [workflowTitle, setWorkflowTitle] = useState("");
  const currentPath = capitalizeFirstLetter(pathname.split('/').pop()||"");

  useEffect(() => {
    const fetchWorkflowTitle = async () => {
      const title = await getWorkFlowTitle(currentPath);
      setWorkflowTitle(String(title));
    };

    fetchWorkflowTitle();
  }, [currentPath]);

  const displayTitle = workflowTitle.trim() === "undefined" ? currentPath : workflowTitle;
  return (
    <header className="absolute flex justify-between right-0 left-0 top-0 px-4 py-1 bg-white dark:bg-black/85 backdrop-blur-lg z-10  items-center border-b-[1px] border-neutral-900 ">
      <h2 className="text-2xl ml-10">{displayTitle}</h2>
      <div className="ml:auto space-x-5 justify-center items-center flex">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeButton />
      </div>
    </header>
  );
};

export default Navbar;
