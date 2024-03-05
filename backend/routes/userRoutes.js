const express = require("express");
const router = express.Router();
// DynamoDBClientを@aws-sdk/client-dynamodbからインポート
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
// DynamoDBDocumentClientとコマンドを@aws-sdk/lib-dynamodbからインポート
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const USERS_TABLE = process.env.USERS_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

router.post("/", async (req, res) => {
  const { userId, username, email } = req.body;

  const params = {
    TableName: USERS_TABLE,
    Item: {
      UserID: userId, // UserID はプライマリキー
      Username: username, // ユーザー名
      Email: email, // ユーザーのメールアドレス
    },
  };

  try {
    await dynamoDbClient.send(new PutCommand(params));
    res.json({ userId, username, email });
  } catch (error) {
    res.status(500).json({ error: "Could not create user" });
  }
});

module.exports = router;
