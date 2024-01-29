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

  const submitConfirmCode = useConfirmCode();

  // `react-hook-form` から受け取るフォームデータを処理
  const onSubmit = (formData: FormData) => {
    submitConfirmCode(formData); // 直接 `formData` を渡す
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="code">確認コード</label>
        <input
          id="code"
          type="text"
          {...register("code", { required: true })}
        />
        {errors.code && <span>確認コードは必須です</span>}
      </div>
      <button type="submit">確認</button>
    </form>
  );
};

export default ConfirmCodePage;
