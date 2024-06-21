"use client";
import { Button } from "@/components/ui/button";
import { Logo } from "../ui/logo";

export const Footer = () => {
  return (
    <div className="flex items-center w-full z-50 backdrop-blur-lg ">
      <Logo />
      <div className="md:ml auto w-full justify-between md:justify-end flex items--center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">Privacy policy</Button>
        <Button variant="ghost" size="sm">Terms & conditions</Button></div>
    </div>
  );
};
