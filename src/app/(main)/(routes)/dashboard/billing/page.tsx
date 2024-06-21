"use client";

import { useBilling } from "@/providers/bill-provider";
import React from "react";
import { SubscriptionCard } from "./_components/sus-card";
import CreditTracker from "./_components/credits-track";

type Props = {};

const BillingDashboard = (props: Props) => {
  const { credits, tier } = useBilling();

  return (
    <div className="h-full overflow-hidden">
      <CreditTracker tier={tier} credits={parseInt(credits)} />

      <div className="flex justify-center">
        <SubscriptionCard
        />
      </div>
    </div>
  );
};

export default BillingDashboard;
