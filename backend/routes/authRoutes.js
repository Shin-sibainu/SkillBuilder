const express = require("express");
const router = express.Router();
const {
  CognitoIdentityProvider,
} = require("@aws-sdk/client-cognito-identity-provider");

const cognito = new CognitoIdentityProvider({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

//signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body; // パスワードもリクエストから取得
  console.log(username, email, password);
  console.log("a");
  const params = {
    ClientId: "7ngliq861o3h9dco82hiibfham",
    Username: username,
    Password: password, // 必要に応じてパスワード指定
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  try {
    const result = await cognito.signUp(params);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//confirmSignup
router.post("/confirmSignup", async (req, res) => {
  const { username, code } = req.body; // ユーザー名と確認コードをリクエストから取得

  const params = {
    ClientId: "7ngliq861o3h9dco82hiibfham", // Cognito アプリクライアントID
    Username: username,
    ConfirmationCode: code, // フロントエンドから送信された確認コード
  };

  try {
    await cognito.confirmSignUp(params);
    res.json({ message: "Account confirmed successfully." }); // アカウント確認成功メッセージ
  } catch (error) {
    res.status(500).json({ error: error.message }); // エラーハンドリング
  }
});

//login
router.post("/login", async (req, res) => {
  const { username, password } = req.body; // パスワードをリクエストから取得する必要があります

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH", // 正しい認証フロー
    ClientId: "7ngliq861o3h9dco82hiibfham", // 正しいCognitoアプリクライアントID
    AuthParameters: {
      USERNAME: username, // USERNAME は大文字で指定
      PASSWORD: password, // リクエストから取得したパスワードを使用
    },
  };

  try {
    const result = await cognito.initiateAuth(params);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
