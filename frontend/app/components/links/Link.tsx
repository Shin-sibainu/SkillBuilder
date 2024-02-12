import React, { ReactNode } from "react";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  textColor?: string;
  bgColor?: string; // 例: 'bg-blue-500'
  children: ReactNode;
}

const NextLink = ({
  href,
  textColor = "text-gray-900",
  bgColor = "bg-transparent",
  children,
}: CustomLinkProps) => {
  const defaultClassName =
    "inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-gray-300 rounded-lg duration-150";

  // テキスト色、背景色、ホバー時の背景色を適用
  const combinedClassName = `${defaultClassName} ${textColor} ${bgColor}`;

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
};

export default NextLink;
