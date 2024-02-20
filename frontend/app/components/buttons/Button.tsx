import React, { ReactNode } from "react";

interface CustomButtonProps {
  textColor?: string;
  bgColor?: string; // 例: 'bg-blue-500'
  children: ReactNode;
  onClick?: () => void; // onClick プロパティの型を関数として定義
  type: "button" | "submit" | "reset";
}

const Button = ({
  textColor = "text-gray-900",
  bgColor = "bg-transparent",
  children,
  onClick,
  type,
}: CustomButtonProps) => {
  const defaultClassName =
    "inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-gray-300 rounded-lg duration-150";

  // テキスト色、背景色、ホバー時の背景色を適用
  const combinedClassName = `${defaultClassName} ${textColor} ${bgColor}`;

  return (
    <button className={combinedClassName} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
