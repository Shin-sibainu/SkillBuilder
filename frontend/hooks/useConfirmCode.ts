import { useCallback } from "react";

export const useConfirmCode = () => {
  const onSubmit = useCallback(async (formData: { code: string }) => {
    const { code } = formData; // フォームデータから確認コードを抽出

    try {
      // 確認コード送信APIへのリクエスト
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/confirmSignup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );

      if (response.ok) {
        // 確認成功時の処理
        console.log("Account confirmed successfully.");
      } else {
        // エラーハンドリング
        throw new Error("Confirmation failed");
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return onSubmit;
};
