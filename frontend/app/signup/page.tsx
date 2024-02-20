"use client";

import React from "react";
import { useForm } from "react-hook-form"; // useForm をreact-hook-formからimport
import Link from "next/link";
import { z } from "zod";
import { signupFormSchema } from "@/lib/formSchema";
import InputField from "../components/form/inputs/InputFiled";
import Button from "../components/buttons/Button";
import { error } from "console";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    console.log(data);
    const { username, email, password } = data;
    //api fetch (signup)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      if (response.ok) {
        localStorage.setItem("username", username);
        router.push("/confirm-code");
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

        <Button bgColor="bg-blue-500" textColor="text-white" type="submit">
          新規登録
        </Button>
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
