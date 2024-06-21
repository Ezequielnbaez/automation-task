"use client";

import React from "react";
import { ModeButton } from "@/components/ui/toggle-mode-button";
import { Logo } from "../../../components/ui/logo";
import { Navigation } from "./navigation";


export const Header = () => {

  return (
    <header className="flex sticky top-0 w-full py-1 px-4  text-[#283996] z-[10] dark:text-white font-bold  backdrop-blur-lg items-center border-b-[1px] border-neutral-900 justify-between ">
      <Logo/>
      <Navigation />
      <ModeButton />
    </header>
  );
};
