import Image from "next/image";
export const Logo = () => {
  return (
    <div className="md:flex items-center gap-x-2">
      <Image src="/logo-light.svg" height="80" width="80" alt="Logo" className="block dark:hidden"/>
      <Image src="/logo-dark.svg" height="80" width="80" alt="Logo" className="hidden dark:block"/>
    </div>
  );
};
