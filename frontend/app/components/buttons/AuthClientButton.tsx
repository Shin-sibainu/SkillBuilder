"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Button from "./Button";
import { ReactNode } from "react";

interface CustomButtonProps {
  textColor?: string;
  bgColor?: string; // 例: 'bg-blue-500'
  children: ReactNode;
  onClick?: () => void; // onClick プロパティの型を関数として定義
  type: "button" | "submit" | "reset";
}

const AuthClientButton = ({
  textColor,
  bgColor,
  children,
  type,
}: CustomButtonProps) => {
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    supabase.auth.signOut();
  };

  return (
    <Button
      type={type}
      bgColor={bgColor}
      textColor={textColor}
      onClick={handleSignOut}
    >
      {children}
    </Button>
  );
};

export default AuthClientButton;
