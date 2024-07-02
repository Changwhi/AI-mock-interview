"use client";
import {
  AI_MOCK_INTERVIEW,
  CONTACT,
  DASHBOARD,
  HOME,
  PRICING,
  SIGN_UP,
} from "@/text/RegularText";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

function Header() {
  const path = usePathname();
  const route = useRouter();
  const user = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="relative md:static z-50 mt-5 px-4 2xl:px-52 h-14 flex flex-col md:flex-row items-center justify-between">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <BotIcon className="h-10 w-10" />
        <span className="sr-only">{AI_MOCK_INTERVIEW}</span>
      </Link>
      <button
        className="md:hidden block text-primary mt-4"
        onClick={toggleMenu}
      >
        <HamburgerIcon className="h-8 w-8" />
      </button>
      <nav
        className={`${
          menuOpen ? "flex" : "hidden"
        }  md:flex flex-col md:flex-row items-center w-full p-2 border-y-2 md:w-auto absolute md:relative top-20 md:top-0 left-0 right-0 bg-white md:bg-transparent z-50 md:z-auto justify-center md:justify-end`}
      >
        <ul className="text-sm md:text-sm font-medium flex flex-col md:flex-row gap-4 md:gap-10">
          <li
            onClick={() => {
              route.push("/");
              setMenuOpen(false);
            }}
            className={`hover:font-semibold cursor-pointer hover:text-primary hover:-translate-y-1 hover:scale-125 hover:duration-300 transition-all ease-in-out ${
              path == "/" && "text-primary font-bold"
            }`}
          >
            {HOME}
          </li>
          <li
            onClick={() => {
              route.push("/main");
              setMenuOpen(false);
            }}
            className={`hover:font-semibold cursor-pointer hover:text-primary hover:-translate-y-1 hover:scale-125 hover:duration-300 transition-all ease-in-out ${
              path == "/main/*" && "text-primary font-bold"
            }`}
          >
            {DASHBOARD}
          </li>
          <li
            onClick={() => {
              route.push("/");
              setMenuOpen(false);
            }}
            className={`hover:font-semibold cursor-pointer hover:text-primary hover:-translate-y-1 hover:scale-125 hover:duration-300 transition-all ease-in-out ${
              path == "/main/pricing" && "text-primary font-bold"
            }`}
          >
            {PRICING}
          </li>
          <li
            className={`hover:font-semibold cursor-pointer hover:text-primary hover:-translate-y-1 hover:scale-125 hover:duration-300 transition-all ease-in-out ${
              path == "/main/contact" && "text-primary font-bold"
            }`}
          >
            <a target="_blank" href="mailto:whinada@gmail.com">
              {CONTACT}
            </a>
          </li>
          {!user.isSignedIn && (
            <li
              onClick={() => {
                route.push("/sign-up");
                setMenuOpen(false);
              }}
              className={`hover:font-semibold cursor-pointer hover:text-primary hover:-translate-y-1 hover:scale-125 hover:duration-300 transition-all ease-in-out ${
                path == "/sign-up" && "text-primary font-bold"
              }`}
            >
              {SIGN_UP}
            </li>
          )}
          <div className="block md:hidden">
            <UserButton />
          </div>
        </ul>

        <div className="hidden md:block ml-5">
          <UserButton />
        </div>
      </nav>
    </header>
  );
}

function BotIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function HamburgerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5"
      />
    </svg>
  );
}

export default Header;
