"use client";
import { Logo } from "../../../components/ui/logo";
import { SignInButton} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div className="<-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6">
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
          <div>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Get TaskSync for free
              </Button>
            </SignInButton>
          </div>
      </div>
    </div>
  );
};
