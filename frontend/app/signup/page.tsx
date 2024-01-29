"use client";

import useBasicForm from "@/hooks/useBasicForm";
import React from "react";
import BasicAuthForm from "../components/form/BasicAuthForm";

const SignUp = () => {
  const { form, onSubmit } = useBasicForm("signup");
  const {
    register,
    formState: { errors },
  } = form; // `errors` オブジェクトを取得

  return <BasicAuthForm form={form} onSubmit={onSubmit} title={"新規登録"} />;
};

export default SignUp;
