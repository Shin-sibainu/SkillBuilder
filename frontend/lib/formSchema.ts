import * as z from "zod";

// export const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "ユーザー名は2文字以上で入力してください。",
//   }),
//   email: z
//     .string()
//     .email({ message: "適切なメールアドレスを入力してください。" }),
//   password: z
//     .string()
//     .min(8, { message: "パスワードは8文字以上で入力してください。" }),
// });

export const loginFormSchema = z.object({
  username: z.string().min(2, "ユーザー名は2文字以上で入力してください。"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください。"),
});

// export const signupFormSchema = z.object({
//   username: z.string().min(2, "ユーザー名は2文字以上で入力してください。"),
//   email: z.string().email("適切なメールアドレスを入力してください。"),
//   password: z.string().min(8, "パスワードは8文字以上で入力してください。")
// });

export const signupFormSchema = loginFormSchema.extend({
  email: z.string().email("適切なメールアドレスを入力してください。"),
});
