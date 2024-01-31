import useBasicForm from "@/hooks/useBasicForm";
import React from "react";
import { BasicAuthFormProps } from "./BasicAuthForm.types";
import Link from "next/link";

const BasicAuthForm = ({
  onSubmit,
  form,
  title,
  serverError,
}: BasicAuthFormProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form
      className="max-w-sm mx-auto mt-36"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <h2 className="text-center mb-5 text-2xl font-medium">{title}</h2>
      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          ユーザー名
        </label>
        <input
          {...register("username")} // register関数を使用
          type="text"
          id="username"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ユーザー名"
          required
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>
      {title === "新規登録" && (
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            メールアドレス
          </label>
          <input
            {...register("email")} // register関数を使用
            type="email"
            id="email"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
      )}
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          パスワード
        </label>
        <input
          {...register("password")} // register関数を使用
          type="password"
          id="password"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="パスワード"
          required
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        {serverError && <p className="text-red-500">{serverError}</p>}
      </div>
      <div className="">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {title === "ログイン" ? "ログイン" : "新規登録"}
        </button>
        {title === "ログイン" ? (
          <div className="text-center mt-4">
            <Link href="/signup" className="text-blue-600 hover:underline">
              初めてのご利用の方はこちら
            </Link>
          </div>
        ) : (
          <div className="text-center mt-4">
            <Link href="/login" className="text-blue-600 hover:underline">
              すでに登録済みの方はこちら
            </Link>
          </div>
        )}
      </div>
    </form>
  );
};

export default BasicAuthForm;
