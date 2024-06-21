"use client";
import React from "react";
import { CardGradient } from "@/components/ui/card-gradient";


export const SubscriptionCard = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center ">
      <CardGradient type={0} title={"Basic"} price={0} desc={"10 créditos"} />
      <CardGradient type={1} title={"Junior"} price={10} desc={"50 créditos"} />
      <CardGradient type={2} title={"Pro"} price={20} desc={"100 créditos"} />
    </div>
  );
};
