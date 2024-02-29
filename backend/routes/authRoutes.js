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
// サインアップ
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const response = await cognito.signUp({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: username,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
      ],
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// サインアップの確認
router.post("/confirmSignup", async (req, res) => {
  const { username, code } = req.body;

  // emailとcodeが正しく提供されているかを確認
  if (!username || !code) {
    return res
      .status(400)
      .json({ error: "username and confirmation code are required." });
  }

  try {
    const response = await cognito.confirmSignUp({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: username,
      ConfirmationCode: code,
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ログイン
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await cognito.initiateAuth({
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });

    // JWTトークンを取得
    const { AuthenticationResult } = response;
    const { IdToken, AccessToken } = AuthenticationResult;

    res.cookie("idToken", "IdToken", {
      maxAge: 3600000,
      httpOnly: false,
      secure: false,
      sameSite: "none",
    });

    res.cookie("accessToken", AccessToken, {
      maxAge: 3600000,
      httpOnly: false,
      secure: false,
      sameSite: "none",
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
