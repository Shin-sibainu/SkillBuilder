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
router.post("/signup", async (req, res) => {});

//confirmSignup
router.post("/confirmSignup", async (req, res) => {});

//login
router.post("/login", async (req, res) => {});

module.exports = router;
