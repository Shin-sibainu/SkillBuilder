import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const useConfirmCode = () => {
  const [error, setError] = useState<string>(""); // エラー状態を管理
  const router = useRouter();

  const onSubmit = useCallback(
    async (formData: { code: number }) => {
      const { code } = formData; // フォームデータから確認コードを抽出

      const username = localStorage.getItem("username");

      try {
        // 確認コード送信APIへのリクエスト
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/confirmSignup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, code }),
          }
        );

        if (response.ok) {
          // 確認成功時の処理
          // console.log("Account confirmed successfully.");
          router.push("/login");
        } else {
          // エラーハンドリング
          // const errorData = await response.json(); // エラーレスポンスからエラーメッセージを取得
          console.log(await response.json());
          setError("確認コードが間違っています。");
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred"); // 不明なエラーの場合のデフォルトメッセージ
        }
      }
    },
    [router]
  );

  return { onSubmit, error };
};
