import React, { ReactNode } from "react";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  textColor?: string;
  bgColor?: string; // 例: 'bg-blue-500'
  children: ReactNode;
}

// 背景色クラスからホバー時のクラスを生成する関数
const generateHoverBgClass = (bgColorClass: string): string => {
  const parts = bgColorClass.split("-");
  if (parts.length > 1) {
    const intensity = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(intensity) && intensity < 900) {
      // 900未満の場合のみ暗くする
      parts[parts.length - 1] = String(intensity + 100);
      return `hover:${parts.join("-")}`; // 例: 'hover:bg-blue-600'
    }
  }
  return "hover:bg-gray-600"; // デフォルトのホバー時背景色
};

const NextLink = ({
  href,
  textColor = "text-gray-900",
  bgColor = "bg-transparent",
  children,
}: CustomLinkProps) => {
  const defaultClassName =
    "inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-gray-300 rounded-lg transition duration-150";

  const hoverBgClass = generateHoverBgClass(bgColor);

  // テキスト色、背景色、ホバー時の背景色を適用
  const combinedClassName = `${defaultClassName} ${textColor} ${bgColor} ${hoverBgClass}`;

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
};

export default NextLink;
