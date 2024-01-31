// login and signinForm
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { formSchema } from "@/lib/formSchema";
import { loginFormSchema, signupFormSchema } from "@/lib/formSchema";
import { useCallback, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

type LoginFormValues = z.infer<typeof loginFormSchema>;
type SignupFormValues = z.infer<typeof signupFormSchema>;

const useBasicForm = (actionType: "login" | "signup") => {
  const [serverError, setServerError] = useState<string>("");
  const router = useRouter();

  const schema = actionType === "login" ? loginFormSchema : signupFormSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: LoginFormValues | SignupFormValues) => {
      const { username, password } = values;
      let email = "";

      // `email` プロパティが存在するかチェック
      if ("email" in values) {
        email = values.email;
      }

      try {
        //login or signup api
        const API_URL = `${process.env.NEXT_PUBLIC_API_URL}${
          actionType === "login" ? "/auth/login" : "/auth/signup"
        }`;
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // ヘッダーに Content-Type を設定
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });

        if (response.ok) {
          setServerError("");
          if (actionType === "login") {
            router.push("/skillBuild");
          } else if (actionType === "signup") {
            localStorage.setItem("username", username);
            router.push("/confirm-code");
          }
        } else {
          console.log("error");
          //TODO:ログインの方でエラーになったときに存在しないのかそれとも区別がついてないのかの分岐ができてないから修正。
          setServerError("パスワードは小文字と大文字と数字を含めてください。");
        }
      } catch (err) {
        console.error(err);
        setServerError("An unknown error occurred"); // 不明なエラーが発生した場合のメッセージ
      }
    },
    [actionType, router]
  );
  return { form, onSubmit, serverError };
};

export default useBasicForm;
