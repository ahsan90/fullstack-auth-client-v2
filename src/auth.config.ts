import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import baseAPI_URL from "@/_utils/baseAPI_URL";
import extractTokens from "@/_utils/extractTokens";

export default {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials;
        try {
          const response = await fetch(`${baseAPI_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            //const { message } = await response.json();
            //throw new Error(message);
            return null;
          }

          const headerToken = response.headers.get("set-cookie") as string;
          const { message, user } = await response.json();
          //console.log("headerToken: ", headerToken);
          if (user && headerToken) {
            const { accessToken, refreshToken } = extractTokens(headerToken);
            return {
              accessToken: accessToken,
              refreshToken: refreshToken,
              user: JSON.stringify(user),
            };
          } else {
            return null;
          }
        } catch (error) {
          //console.log('error from auth config: ',error);
          //throw new Error(error.message);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
