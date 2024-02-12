import Image from "next/image";
import Link from "next/link";
import React from "react";
import NextLink from "../links/Link";

const Header = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
              width={30}
              height={200}
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              SkillBuilder
            </span>
          </Link>
          <div className="flex items-center lg:order-2 mt-3 md:mt-0 gap-3">
            <NextLink
              href="/login"
              textColor="text-white"
              bgColor="bg-blue-500"
            >
              ログイン
            </NextLink>
            <NextLink
              href="/skillBuild"
              textColor="text-black"
              bgColor="bg-slate-100"
            >
              スキルビルド
            </NextLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
