"use client";

import React from "react";
import { useForm } from "react-hook-form"; // useForm をreact-hook-formからimport
import Link from "next/link";
import { z } from "zod";
import { signupFormSchema } from "@/lib/formSchema";
import InputField from "../components/form/inputs/InputFiled";

const SignUp = () => {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    mode: "onChange",
  });

  const onSubmit = (data: z.infer<typeof signupFormSchema>) => {
    console.log(data);
    // 送信処理...
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="max-w-sm mx-auto mt-36">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center mb-5 text-2xl font-medium">新規登録</h2>

        <InputField
          label="ユーザー名"
          type="text"
          id="username"
          placeholder="ユーザー名"
          errorMessage={errors.username?.message}
          register={register}
          required={true}
        />

        <InputField
          label="メールアドレス"
          type="email"
          id="email"
          placeholder="name@example.com"
          errorMessage={errors.email?.message}
          register={register}
          required={true}
        />

        <InputField
          label="パスワード"
          type="password"
          id="password"
          placeholder="パスワード"
          errorMessage={errors.password?.message}
          register={register}
          required={true}
        />

        <div className="mt-6">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            新規登録
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <Link href="/login" className="text-blue-600 hover:underline">
          すでに登録済みの方はこちら
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
