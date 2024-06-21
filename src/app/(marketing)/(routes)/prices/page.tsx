"use client";

import { CardGradient } from "../../../../components/ui/card-gradient";
import { Highlight } from "@/components/ui/hero-highlight";

const PricesPage = () => {
  return (
    <div>
      <h2 className="justify-center items-center text-black dark:text-white lg:ml-20 m-10 text-4xl">
        Precios accesibles para una organización{" "}
        <Highlight className="text-black dark:text-white">
          completa y eficiente.
        </Highlight>
      </h2>
      <div className="flex flex-col lg:flex-row justify-center ">
        <CardGradient type={0} title={"Basic"} price={0} desc={"10 créditos"}/>
        <CardGradient type={1} title={"Junior"} price={10} desc={"50 créditos"}/>
        <CardGradient type={2} title={"Pro"} price={20} desc={"100 créditos"}/>
      </div>
    </div>
  );
};

export default PricesPage;
