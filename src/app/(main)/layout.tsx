"use client";

import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { HeroHighlight } from "@/components/ui/hero-highlight";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroHighlight className="h-full w-full flex ">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar />
        {children}
      </div>
    </HeroHighlight>
  );
};

export default MainLayout;
