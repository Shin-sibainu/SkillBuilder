"use client";

import { useConfirmCode } from "@/hooks/useConfirmCode";
import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  code: string;
};

const ConfirmCodePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { onSubmit, error } = useConfirmCode(); // エラー状態を受け取る

  return (
    <form className="max-w-sm mx-auto mt-36" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center mb-3 text-2xl font-medium">
        確認コードを入力
      </h2>
      <p className="text-center mb-5">
        登録したメールアドレスを確認してください。
      </p>
      <div className="mb-5">
        <label
          htmlFor="code"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          確認コード
        </label>
        <input
          id="code"
          type="text"
          {...register("code", { required: "確認コードは必須です" })}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="確認コード"
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        確認
      </button>
    </form>
  );
};

export default ConfirmCodePage;
