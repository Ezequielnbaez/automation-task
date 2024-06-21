"use client";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

import useScreenSize from "@/components/hooks/use-screenSize";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const Navigation = () => {
  const [isAuthenticated, isLoading] = useState(false);
  const screenSize = useScreenSize();

  return (
    <div className="w-full flex">
      {!screenSize.isCollapsed && (
        <aside className="ml-5 flex items-center gap-[12px]">
          <ul className="flex items-center gap-4 list-none">
            <li
              className="transform transition duration-300 
                                hover:scale-110"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className="transform transition duration-300 
                                hover:scale-110"
            >
              <Link href="/prices">Prices</Link>
            </li>
            <li
              className="transform transition duration-300 
                                hover:scale-110"
            >
              <Link href="/company">Company</Link>
            </li>
          </ul>
        </aside>
      )}

      {screenSize.isCollapsed && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>Products</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="#">Prices</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="#">Resources</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="#">Documentation</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="#">Company</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <div className="ml-auto justify-end sm:justify-between right-2 flex  gap-x-2 mr-2 ">
        {isAuthenticated && (
          <button className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Dashboard
          </button>
        )}
        <SignedIn>
          <button
            className=" transform 
                                hover:scale-105 inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <Link href={"/dashboard"}>Dashboard</Link>
          </button>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              Sign In/Sign Up
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};
