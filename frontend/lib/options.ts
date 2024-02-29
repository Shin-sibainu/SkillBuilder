import {
  AdminInitiateAuthCommand,
  AdminInitiateAuthCommandInput,
  CognitoIdentityProvider,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { AuthOptions, NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import CredentialsProvider from "next-auth/providers/credentials";
import * as crypto from "crypto";
// import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
import jwt_decode from "jwt-decode";
import { Issuer } from "openid-client";

// export const options: NextAuthOptions = {
//   providers: [
//     CognitoProvider({
//       id: "cognito",
//       clientId: process.env.COGNITO_CLIENT_ID || "",
//       clientSecret: process.env.COGNITO_CLIENT_SECRET || "",
//       issuer: process.env.COGNITO_ISSUER,
//       checks: "nonce",
//     }),
//   ],

//   // providers: [
//   //   CredentialsProvider({
//   //     name: "Cognit",
//   //     credentials: {
//   //       username: { label: "Username", type: "text" },
//   //       email: { label: "Email", type: "text" },
//   //       password: { label: "Password", type: "password" },
//   //     },
//   //     async authorize(credentials) {
//   //       const cognitoClient = new CognitoIdentityProvider({
//   //         region: process.env.COGNITO_REGION,
//   //       });
//   //       const username = credentials?.username ?? "";
//   //       const email = credentials?.email ?? "";
//   //       const password = credentials?.password ?? "";
//   //       const secretHash = crypto
//   //         .createHmac("SHA256", process.env.COGNITO_CLIENT_SECRET ?? "")
//   //         .update(email + process.env.COGNITO_CLIENT_ID)
//   //         .digest("base64");
//   //       try {
//   //         const response = await cognitoClient.send(
//   //           new InitiateAuthCommand({
//   //             AuthFlow: "USER_PASSWORD_AUTH",
//   //             ClientId: process.env.COGNITO_CLIENT_ID,
//   //             AuthParameters: {
//   //               USERNAME: email,
//   //               PASSWORD: password,
//   //               SECRET_HASH: secretHash,
//   //             },
//   //           })
//   //         );
//   //         if (response.AuthenticationResult) {
//   //           if (!response.AuthenticationResult.IdToken) {
//   //             throw new Error("No Id Token");
//   //           }
//   //           const { IdToken, AccessToken, ExpiresIn, RefreshToken } =
//   //             response.AuthenticationResult;
//   //           return {
//   //             email,
//   //             idToken: IdToken,
//   //             accessToken: AccessToken,
//   //             expiresIn: ExpiresIn,
//   //             refreshToken: RefreshToken,
//   //           };
//   //         } else {
//   //           throw new Error("No Auth Response Result");
//   //         }
//   //       } catch (error) {
//   //         throw new Error("Auth Error");
//   //       }
//   //     },
//   //   }),
//   // ],
//   // callbacks: {
//   //   async jwt({ token, user }) {
//   //     if (user) {
//   //       token.idToken = user.idToken;
//   //       token.accessToken = user.accessToken;
//   //       token.expiresIn = user.expiresIn;
//   //       token.refreshToken = user.refreshToken;
//   //       token.email = user.email;
//   //     }
//   //     const decodedToken = jwtDecode(token.idToken as string);
//   //     const currentTime = Math.floor(Date.now() / 1000);
//   //   },
//   // },
// };

export const get_jwt_decoded = (
  token: string,
): {
  [name: string]: string;
} => {
  return jwt_decode<{ [name: string]: string }>(token);
};


const cognitoProvider = CognitoProvider({
  id: "cognito",
  clientId: process.env.COGNITO_CLIENT_ID!,
  clientSecret: process.env.COGNITO_CLIENT_SECRET!,
  issuer: process.env.COGNITO_ISSUER,
  checks: "nonce",
});

async function refreshAccessToken(token: any): Promise<JWT> {
  try {
    const client_id = cognitoProvider.options?.clientId ?? "";
    const client_secret = cognitoProvider.options?.clientSecret ?? "";
    const issuer = await Issuer.discover(cognitoProvider.wellKnown!);
    const token_endpoint = issuer.metadata.token_endpoint ?? "";
    const basicAuthParams = `${client_id}:${client_secret}`;
    const basicAuth = Buffer.from(basicAuthParams).toString("base64");
    const params = new URLSearchParams({
      client_id,
      client_secret,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    });
    // Refresh token
    const response = await fetch(token_endpoint, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      method: "POST",
      body: params.toString(),
    });
    const newTokens = await response.json();
    console.log(`newTokens: ${JSON.stringify(newTokens)}`);
    if (!response.ok) {
      throw newTokens;
    }
    // Next expiration period
    const accessTokenExpires =
      Math.floor(Date.now() / 1000) + newTokens.expires_in;
    console.debug(`Token refreshed (expires at: ${accessTokenExpires})`);
    // Return new token set
    return {
      ...token,
      error: undefined,
      accessToken: newTokens.access_token,
      accessTokenExpires,
      idToken: newTokens.id_token,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const signIn = async (username: string, password: string) => {
  const client = new CognitoIdentityProvider({
    region: process.env.COGNITO_REGION,
  });

  const secretHash = crypto
    .createHmac("sha256", process.env.COGNITO_CLIENT_SECRET!)
    .update(username + process.env.COGNITO_CLIENT_ID)
    .digest("base64");


    try {
      const adminInput: AdminInitiateAuthCommandInput = {
        ClientId: process.env.COGNITO_CLIENT_ID,
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
          SECRET_HASH: secretHash,
        },
      };
  
      const user = await client.send(new AdminInitiateAuthCommand(adminInput));
      const expiresIn = user.AuthenticationResult?.ExpiresIn || 3600;
      const accessTokenExpires = Math.floor(Date.now() / 1000) + expiresIn;
      if (user.AuthenticationResult?.IdToken) {
        const decodedIdToken = get_jwt_decoded(
          user.AuthenticationResult?.IdToken,
        );
        return {
          id: decodedIdToken.sub || "",
          name: decodedIdToken.email || "",
          email: decodedIdToken.email || "",
          idToken: user.AuthenticationResult?.IdToken,
          refreshToken: user.AuthenticationResult?.RefreshToken,
          accessToken: user.AuthenticationResult?.AccessToken,
          accessTokenExpires: accessTokenExpires,
        };
      }
    } catch (err) {
      console.log
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: {
          label: "ユーザー名",
          type: "text",
          placeholder: "ユーザ名",
        },
        password: { label: "パスワード", type: "password" },
      },
      authorize: async (credentials, req) => {
        const usre = await signIn(
          credentials?.username || "",
          credentials?.password || ""
        );
      },
    }),
  ],
};
