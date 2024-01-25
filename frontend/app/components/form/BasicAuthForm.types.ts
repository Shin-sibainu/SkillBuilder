import { formSchema } from "@/lib/formSchema";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type BasicAuthFormProps = {
  onSubmit: SubmitHandler<z.infer<typeof formSchema>>;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  title: string;
};
