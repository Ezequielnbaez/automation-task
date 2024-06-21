"use client";

import { Separator } from "@/components/ui/separator";

import React, { useState } from "react";
import Link from "next/link";

import {
  ArrowBigLeft,
  Bot,
  ClipboardMinus,
  CloudDownload,
  CreditCard,
  Database,
  GitBranch,
  Home,
  LayoutGrid,
  LucideMousePointerClick,
  Menu,
  Settings,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  
  const onCollapse = () => {
    setCollapsed((current) => !current);
  };

  return (
    <div>
      {isCollapsed && (
        <Button className=" absolute z-[9999] m-2 px-1 py-1 h-8" onClick={onCollapse}>
          <Menu />
        </Button>
      )}
      {!isCollapsed && (
        <nav
          className="absolute z-[9999] dark:bg-black h-screen px-2 overflow-hidden flex items-center flex-col
     "
        >
          <div className="flex items-center justify-center flex-col gap-2">
            <Button className="mt-2 px-1 py-1 h-8" onClick={onCollapse}>
              <ArrowBigLeft />
            </Button>
            <ul className="justify-center">
              <li
                className="my-3 p-1 transform transition duration-300 rounded
                              hover:scale-110 dark:hover:bg-white/15 "
              >
                <Link href="/dashboard">
                  <Home />
                </Link>
              </li>
              <li
                className="mb-3 p-1 transform transition duration-300 rounded
                              hover:scale-110 dark:hover:bg-white/15"
              >
                <Link href="/dashboard/workflows">
                  <Zap />
                </Link>
              </li>
              <li
                className="mb-3 p-1 transform transition duration-300 rounded
                              hover:scale-110 dark:hover:bg-white/15"
              >
                <Link href="/dashboard/ai">
                  <Bot />
                </Link>
              </li>
              <li
                className="mb-3 p-1 transform transition duration-300 rounded
                              hover:scale-110 dark:hover:bg-white/15"
              >
                <Link href="/dashboard/settings">
                  <Settings />
                </Link>
              </li>
              <li
                className="mb-3 p-1 transform transition duration-300 rounded
                              hover:scale-110 dark:hover:bg-white/15"
              >
                <Link href="/dashboard/apps">
                  <LayoutGrid />
                </Link>
              </li>
              <li
                className="mb-3 p-1 transform transition duration-300 rounded
                              hover:scale-110 dark:hover:bg-white/15"
              >
                <Link href="/dashboard/billing">
                  <CreditCard />
                </Link>
              </li>
            </ul>
            <Separator />
            <div className="overflow-auto flex h-56 justify-center items-center flex-col gap-8 dark:bg-[#353346]/30 py-1 px-1 rounded-full border-[1px]">
              <div className="relative dark:bg-[#353346]/70 p-1 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-t[#353346]">
                <LucideMousePointerClick size={15} />
                <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
              </div>

              <div className="relative dark:bg-[#353346]/70 p-1 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-t[#353346]">
                <GitBranch size={15} />
                <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
              </div>

              <div className="relative dark:bg-[#353346]/70 p-1 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-t[#353346]">
                <Database size={15} />
                <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
              </div>

              <div className="relative dark:bg-[#353346]/70 p-1 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-t[#353346]">
                <GitBranch size={15} />
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
