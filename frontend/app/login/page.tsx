"use client";

import useBasicForm from "@/hooks/useBasicForm";
import React from "react";
import BasicAuthForm from "../components/form/BasicAuthForm";

const Login = () => {
  const { form, onSubmit, serverError } = useBasicForm("login");

  return (
    <BasicAuthForm
      form={form}
      onSubmit={onSubmit}
      title={"ログイン"}
      serverError={serverError}
    />
  );
};

export default Login;
