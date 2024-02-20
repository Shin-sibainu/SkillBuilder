"use client";

import useBasicForm from "@/hooks/useBasicForm";
import React from "react";
import { loginFormSchema } from "@/lib/formSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../components/form/inputs/InputFiled";
import Button from "../components/buttons/Button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    console.log(data);
    const { username, password } = data;
    //api fetch (signup)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
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
    <div className="max-w-sm mx-auto mt-36">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center mb-5 text-2xl font-medium">ログイン</h2>

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
          label="パスワード"
          type="password"
          id="password"
          placeholder="パスワード"
          errorMessage={errors.password?.message}
          register={register}
          required={true}
        />

        <Button bgColor="bg-blue-500" textColor="text-white" type="submit">
          ログイン
        </Button>
      </form>
      <div className="text-center mt-4">
        <Link href="/signup" className="text-blue-600 hover:underline">
          初めてのご利用の方はこちら
        </Link>
      </div>
    </div>
  );
};

export default Login;
