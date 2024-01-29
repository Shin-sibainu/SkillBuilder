// login and signinForm
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/formSchema";
import { useCallback } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const useBasicForm = (actionType: string) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const { username, email, password } = values;

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

        console.log(response.ok);
        console.log(await response.json());
        console.log(actionType);

        if (response.ok) {
          if (actionType === "login") {
            router.push("/skillbuild");
          } else if (actionType === "signup") {
            console.log("signup");
            router.push("/confirm-code");
          }
        } else {
          throw new Error("Failed to log in or sign up");
        }
      } catch (err) {
        console.error(err);
      }
    },
    [actionType, router]
  );
  return { form, onSubmit };
};

export default useBasicForm;
