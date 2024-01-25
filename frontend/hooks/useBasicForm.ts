// login and signinForm
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/formSchema";
import { useCallback } from "react";
import { z } from "zod";

const useBasicForm = (actionType: string) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const { username, email } = values;

      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);

      try {
        //login or signup api
        const apiUrl = actionType === "login" ? "/api/login" : "/api/signup";
        await fetch(apiUrl, { method: "POST", body: formData });
      } catch (err) {
        console.error(err);
      }
    },
    [actionType]
  );
  return { form, onSubmit };
};

export default useBasicForm;
