import * as z from "zod";

export const loginFormSchema = z.object({
  username: z.string().min(2, "ユーザー名は2文字以上で入力してください。"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください。"),
});

export const signupFormSchema = loginFormSchema.extend({
  email: z.string().email("適切なメールアドレスを入力してください。"),
});
