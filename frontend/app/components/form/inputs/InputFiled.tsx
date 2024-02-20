// components/InputField.tsx
import React from "react";
import { UseFormRegister, useForm } from "react-hook-form";

// FormData 型の定義 (SignUp コンポーネントで使用される)
interface FormData {
  username: string;
  password: string;
  email: string;
}

// InputFieldProps の修正
interface InputFieldProps {
  label: string;
  type: string;
  id: string; // FormData のキーを id の型として使用
  placeholder: string;
  errorMessage?: string;
  register: UseFormRegister<any>; // register の型を UseFormRegister<FormData> に設定
  required: boolean;
}
const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  placeholder,
  errorMessage,
  register,
  required,
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        {...register(id, { required })}
        type={type}
        id={id}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
