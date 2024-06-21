"use client";
import React, { useState } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { ChevronRight } from "lucide-react";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import axios from "axios";

const preferences = [
  { title: "Junior", cost: 10, credits: 50 },
  { title: "Pro", cost: 20, credits: 100 },
];

type cardProps = {
  type: number;
  price: number;
  title: string;
  desc: string;
};
export function CardGradient({ price, title, desc, type }: cardProps) {
  const [preferenceId, setPreferenceId] = useState(null);
  const router = useRouter();

  initMercadoPago("TEST-e577a1b9-5936-4bc7-8a0e-4f73d7851ba4");
  const createPreference = async (type: number) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/payment",
        preferences[type]
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };
  const handleBuy = async (type: number) => {
    const preference = await createPreference(type);
    setPreferenceId(preference);
    return preference;
  };

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("http://localhost:3000/dashboard");
  };

  return (
    <div className="w-60 m-10 z-0">
      <BackgroundGradient className="rounded-[22px] p-4 sm:p-8 bg-white dark:bg-[#0A0718]">
        <p className="text-6xl text-black mt-4 mb-2 dark:text-neutral-200">
          {price}$
        </p>
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {title}
        </p>

        <ul className="text-sm mt-4 text-neutral-600 dark:text-neutral-400">
          <li className="flex">
            <ChevronRight />
            {desc}
          </li>
        </ul>
        <div className="flex flex-col w-full items-center justify-center">
          {type != 0 && (
            <div className="flex flex-col justify-center m-auto">
              <Button
                onClick={() => handleBuy(type)}
                className="transform transition duration-300 
                                hover:scale-110 mt-6 relative inline-flex h-12 w-28 overflow-hidden rounded-full  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                Subscribe
              </Button>
            </div>
          )}
          {preferenceId && (
            <div>
            <Wallet
              initialization={{ preferenceId: preferenceId }}
              customization={{
                texts: { valueProp: "smart_option" },
                visual: {
                  hideValueProp: true,
                },
              }}
            />
            </div>
          )}
          {type == 0 && (
            <Button
              className="transform transition duration-300 
            hover:scale-110 mt-6 relative inline-flex h-12 w-28 overflow-hidden rounded-full  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              onClick={handleClick}
            >
              Free
            </Button>
          )}
        </div>
      </BackgroundGradient>
    </div>
  );
}
