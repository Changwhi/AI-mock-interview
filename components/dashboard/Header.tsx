"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function Header() {
  const path = usePathname();
const databaseUrl: string = process.env.NEXT_PUBLIC_DRIZZLE_DATABASE as string;
  useEffect(() => {
    console.log(path);
console.log(databaseUrl);

    console.log(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE?.toString());
    console.log(process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL);
    console.log(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  }, []);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-md">
      <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
      <ul className="hidden md:flex gap-10">
        <li
          className={`hover:font-semibold cursor-pointer hover:text-primary hover:-translate-y-1 hover:scale-125 hover:duration-300 transition-all ease-in-out'
      ${path == "/main" && "text-primary font-semibold"}`}
        >
          Home
        </li>
        <li
          className={`hover:font-semibold cursor-pointer hover:text-primary hover:-translate-y-1 hover:scale-125 hover:duration-300 transition-all ease-in-out'
      ${path == "/main/mypage" && "text-primary font-semibold"}`}
        >
          My page
        </li>
        <li
          className={`hover:font-semibold cursor-pointer hover:text-primary hover:-translate-y-1 hover:scale-125 hover:duration-300 transition-all ease-in-out'
      ${path == "/main/options" && "text-primary font-semibold"}`}
        >
          Options
        </li>
        <li
          className={`hover:font-semibold cursor-pointer hover:text-primary hover:-translate-y-1 hover:scale-125 hover:duration-300 transition-all ease-in-out'
      ${path == "/main/about" && "text-primary font-semibold"}`}
        >
          About Us
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
