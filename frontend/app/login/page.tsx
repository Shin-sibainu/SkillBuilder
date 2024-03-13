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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Login = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof loginFormSchema>) => {
    const { email, password } = value;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error.message);
      throw error;
    }

    //user table insert to dynamodb(api)
    router.push("/");
    router.refresh();
    try {
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
