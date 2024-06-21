"use client";

import Chat from "@/app/(main)/(routes)/dashboard/ai/_components/chat";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const placeholders = [
  "Give me a routine for mailing?",
  "Ideas for new plans",
  "Did Nisman killed himself?",
  "Do me a routine like yesterday",
];

const Aichat = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Ask and program routines with AI
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Aichat;

/*
<Chat/>
/>*/
