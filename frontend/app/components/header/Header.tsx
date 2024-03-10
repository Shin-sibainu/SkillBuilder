import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Button from "../buttons/Button";
import NextLink from "../links/Link";
import AuthClientButton from "../buttons/AuthClientButton";

const Header = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

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
            {session ? (
              <AuthClientButton
                type="button"
                bgColor="bg-blue-500"
                textColor="text-white"
              >
                ログアウト
              </AuthClientButton>
            ) : (
              <NextLink
                href="/login"
                textColor="text-white"
                bgColor="bg-blue-500"
              >
                ログイン
              </NextLink>
            )}
            <NextLink href="/skillBuild">スキルビルド</NextLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
