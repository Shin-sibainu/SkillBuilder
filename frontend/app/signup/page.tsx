"use client";

import React from "react";
import { useForm } from "react-hook-form"; // useForm をreact-hook-formからimport
import Link from "next/link";
import { z } from "zod";
import { signupFormSchema } from "@/lib/formSchema";
import InputField from "../components/form/inputs/InputFiled";
import Button from "../components/buttons/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const SignUp = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

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
    const { username, email, password } = data;

    try {
      //supabaseで新規登録
      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.log(error.message);
        throw error;
      }

      if (signUpData && signUpData.user) {
        //DynamoDBへの操作(ユーザー＆スキル進捗データの初期化と作成)
        await initializeUserData(signUpData.user.id, username, email);
      }
    } catch (err) {
      console.error(err);
    }
    router.push("/confirm-email");
  };

  const initializeUserData = async (
    userId: string,
    username: string,
    email: string
  ) => {
    await insertUserData(userId, username, email);

    await initializeUserSkills(userId);
  };

  //DynamoDBでユーザーデータ挿入
  const insertUserData = async (
    userId: string,
    username: string,
    email: string
  ) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, username, email }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        `Failed to insert user data into DynamoDB: ${error.message}`
      );
    }
  };

  //DynamoDBでスキル進捗度のデータ挿入
  const initializeUserSkills = async (userId: string) => {
    // スキルセットを定義（静的に定義されている場合）
    const skills = ["Skill1", "Skill2", "Skill3"]; // 例

    // 各スキルに対して、ユーザーの進捗度を0%でDynamoDBに初期化するエントリを作成
    for (const skillId of skills) {
      await insertUserSkillProgress(userId, skillId, 0); // 進捗度を0%で初期化する関数
    }
  };

  const insertUserSkillProgress = async (
    userId: string,
    skillId: string,
    progress: number
  ) => {
    // DynamoDBにユーザーのスキル進捗度を挿入するAPIコールを実装
    // この関数の中で、fetchを使用してAPIエンドポイントを叩くなど
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/skill-progress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            skillId,
            progress,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to insert skill progress: ${errorData.message}`
        );
      }

      // 応答データの処理（必要に応じて）
      const data = await response.json();
      console.log(`Skill progress inserted successfully:`, data);
    } catch (error) {
      console.error("Error inserting skill progress:", error);
      throw error; // エラーを再スローし、呼び出し元で捕捉可能にする
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
