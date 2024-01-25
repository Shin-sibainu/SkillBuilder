"use client";

import useBasicForm from "@/hooks/useBasicForm";
import React from "react";
import BasicAuthForm from "../components/form/BasicAuthForm";

const SignIn = () => {
  const { form, onSubmit } = useBasicForm("signin");
  const {
    register,
    formState: { errors },
  } = form; // `errors` オブジェクトを取得

  return <BasicAuthForm form={form} onSubmit={onSubmit} title={"サインイン"} />;
};

export default SignIn;
