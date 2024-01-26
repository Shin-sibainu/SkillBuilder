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

//signin
router.post("/signup", async (req, res) => {
  const { username, email } = req.body;

  const parmas = {
    ClientId: "ap-northeast-1_5ceNlBzbi",
    Username: username,
    Email: email,
  };

  try {
    const result = await cognito.signUp(parmas);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//login
router.post("/login", async (req, res) => {
  const { username, email } = req.body;

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: "ap-northeast-1_5ceNlBzbi",
    AuthParameters: {
      USERNAME: username,
      Email: email,
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
