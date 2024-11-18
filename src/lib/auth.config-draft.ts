import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import baseAPI_URL from "@/utils/baseAPI_URL";
import extractTokens from "@/utils/extractTokens";
import { isTokenExpired } from "@/utils/isTokenExpired";
import { JWT } from "next-auth/jwt";


const refreshAccessToken = async (token: any): Promise<JWT> => {
  //console.log('token to refresh: ', token);
  try {
    const response = await fetch(`${baseAPI_URL}/auth/refresh-access-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${token.refreshToken}`,
      },
    });
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    const headerToken = response.headers.get("set-cookie") as string;
    const tokens = extractTokens(headerToken);
    //console.log('Refreshed tokens: ', tokens);
    return {
      ...token,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken ?? token.refreshToken,
    };
  } catch (error: any) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

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
          const testUser = {
            email: "test@mail.com",
            password: "1122333",
          };
          if (email === testUser.email && password === testUser.password) {
            return {
              email: "test@mail.com",
              name: "test name",
            };
          } else {
            return null;
          }
          //return null;
          // const response = await fetch(`${baseAPI_URL}/auth/login`, {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({ email, password }),
          // });

          // if (!response.ok) {
          //   const { message } = await response.json();
          //   throw new Error(message);
          // }

          // const headerToken = response.headers.get("set-cookie") as string;
          // const { message, user } = await response.json();
          // //console.log("headerToken: ", headerToken);
          // if (user && headerToken) {
          //   const { accessToken, refreshToken } = extractTokens(headerToken);
          //   return {
          //     accessToken: accessToken,
          //     refreshToken: refreshToken,
          //     user: JSON.stringify(user),
          //   };
          // } else {
          //   return null;
          // }
        } catch (error: any) {
          //console.log('error from auth config: ',error);
          throw new Error(error.message);
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
