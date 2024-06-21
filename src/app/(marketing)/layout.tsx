"use client";

import { Header } from "./_components/header";
import { Footer } from "../../components/global/footer";
import { AuroraBackground } from "@/components/ui/aurora-background";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <AuroraBackground className="h-full">
        <div className="h-full w-full">
          <Header />
          {children}
          <Footer />
        </div>
      </AuroraBackground>
  );
};

export default MainLayout;
