import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-4">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023
          <Link href="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
