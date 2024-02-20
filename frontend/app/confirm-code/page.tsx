"use client";

import { useConfirmCode } from "@/hooks/useConfirmCode";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../components/form/inputs/InputFiled";
import Button from "../components/buttons/Button";

type FormData = {
  code: number;
};

const ConfirmCodePage = () => {
  const router = useRouter();

  const form = useForm<{ code: string }>({
    mode: "onChange",
  });

  const onSubmit = async (data: { code: string }) => {
    console.log(data);
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
    <form className="max-w-sm mx-auto mt-36" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center mb-3 text-2xl font-medium">
        確認コードを入力
      </h2>
      <p className="text-center mb-5">
        登録したメールアドレスを確認してください。
      </p>

      <InputField
        register={register}
        label="確認コード"
        id="code"
        type="text"
        placeholder="確認コード"
        errorMessage={errors.code?.message}
        required={true}
      />

      <Button type="submit" bgColor="bg-blue-500" textColor="text-white">
        確認
      </Button>
    </form>
  );
};

export default ConfirmCodePage;
