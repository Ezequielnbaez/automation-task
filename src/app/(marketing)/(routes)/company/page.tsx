"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

const brands = [
  { src: "/app1.png" }as { src: string },
  { src: "/app2.png" }as { src: string },
  { src: "/app3.png" }as { src: string },
  { src: "/app4.png" }as { src: string },
  { src: "/app5.png" }as { src: string },
  { src: "/app6.webp"}as { src: string },
  { src: "/app7.png" }as { src: string },
];

const Company = () => {
  return (
    <div>
      <div className="justify-center items-center pl-20 pr-20">
        <TextGenerateEffect
          words={`Our company leads innovation in virtual assistants, fusing AI and machine learning to simplify daily life. Our products are designed for efficiency and comfort, adapting to individual needs.`}
        />
      </div>
      <div className="flex items-center justify-center sm:space-x-24 lg:space-x-24">
        <p className="text-[#283996] font-black rounded-md text-2xl hidden sm:block lg:block w-72 bg-white/85 p-10 backdrop-blur-none	">
          Join us on the journey towards a smarter future and connected, where
          technology works at your service to make your easier, more efficient
          and rewarding life
        </p>
        <CardContainer className="inter-var rounded-md">
          <CardBody className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-[#27272b]  border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-4 border  ">
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="/company.webp"
                height="1000"
                width="1000"
                className=" object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-center items-center mt-5">
              <CardItem
                translateZ={20}
                as={Link}
                href="/prices"
                target="__blank"
                className="px-4 py-2 rounded-xl text-lg dark:hover:text-white/40 font-normal dark:text-white"
              >
                Try now →
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
      <div className="h-[10rem] rounded-md flex flex-col antialiased bg-white dark:bg-transparent  items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={brands}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
};

export default Company;
