"use client";

import { useConfirmCode } from "@/hooks/useConfirmCode";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../components/form/inputs/InputFiled";
import Button from "../components/buttons/Button";
import Link from "next/link";

type FormData = {
  code: number;
};

const ConfirmEmailPage = () => {
  const router = useRouter();

  const form = useForm<{ code: string }>({
    mode: "onChange",
  });

  const onSubmit = async (data: { code: string }) => {
    // console.log(data);
    const username = localStorage.getItem("username");
    const { code } = data;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/confirmSignup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, code }),
        }
      );

      if (response.ok) {
        console.log(response);
        router.push("/");
      } else {
        console.log(await response.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="max-w-sm mx-auto mt-36" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center mb-3 text-2xl font-medium">
        確認コードを入力
      </h2>
      <p className="text-center mb-5">
        登録したメールアドレスを確認してください。
      </p>

      <Link
        href={"/signup"}
        className="text-blue-500 text-center block mx-auto"
      >
        新規登録へ戻る
      </Link>
    </div>
  );
};

export default ConfirmEmailPage;
