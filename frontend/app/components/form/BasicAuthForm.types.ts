import { loginFormSchema, signupFormSchema } from "@/lib/formSchema";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { z } from "zod";

type LoginFormValues = z.infer<typeof loginFormSchema>;
type SignupFormValues = z.infer<typeof signupFormSchema>;

export type BasicAuthFormProps = {
  onSubmit: SubmitHandler<LoginFormValues | SignupFormValues>;
  form: UseFormReturn<LoginFormValues | SignupFormValues>;
  title: string;
  serverError?: string;
};
// export type BasicAuthFormProps = {
//   onSubmit: SubmitHandler<z.infer<typeof formSchema>>;
//   form: UseFormReturn<z.infer<typeof formSchema>>;
//   title: string;
//   serverError?: string; // サーバーサイドエラー用のプロパティをオプショナルで追加
// };
