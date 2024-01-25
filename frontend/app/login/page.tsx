"use client";

import useBasicForm from "@/hooks/useBasicForm";
import React from "react";
import BasicAuthForm from "../components/form/BasicAuthForm";

const Login = () => {
  const { form, onSubmit } = useBasicForm("login");
  const {
    register,
    formState: { errors },
  } = form; // `errors` オブジェクトを取得

  return <BasicAuthForm form={form} onSubmit={onSubmit} title={"ログイン"} />;
};

export default Login;
