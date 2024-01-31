"use client";

import useBasicForm from "@/hooks/useBasicForm";
import React from "react";
import BasicAuthForm from "../components/form/BasicAuthForm";

const SignUp = () => {
  const { form, onSubmit, serverError } = useBasicForm("signup");

  return (
    <BasicAuthForm
      form={form}
      onSubmit={onSubmit}
      title={"新規登録"}
      serverError={serverError}
    />
  );
};

export default SignUp;
