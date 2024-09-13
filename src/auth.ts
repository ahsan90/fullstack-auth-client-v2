import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { JWT } from "next-auth/jwt";
import baseAPI_URL from "./_utils/baseAPI_URL";
import extractTokens from "./_utils/extractTokens";
import { isTokenExpired } from "./_utils/isTokenExpired";

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

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    // async authorized({ request: { nextUrl }, auth }) {
    //   const isAdminLoggedIn = !!auth?.user && auth.user?.role === "ADMIN";
    //   const isUserLoggedIn = !!auth?.user && auth.user?.role === "USER";
    //   console.log("isAdminLoggedIn: ", isAdminLoggedIn);
    //   console.log("isUserLoggedIn: ", isUserLoggedIn);
    //   if (isAdminLoggedIn) {
    //     return Response.redirect(new URL("/admin/profile", nextUrl));
    //   }
    //   if (isUserLoggedIn) {
    //     return Response.redirect(new URL("/dashboard/profile", nextUrl));
    //   }
    //   return !!auth;
    // },
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = JSON.parse(user.user as any);
        return token;
      }
      // if(Date.now() < new Date(getTokenExpiration(token.accessToken) as Date).getTime()) {
      //   //console.log('token not expired');
      //   return token;
      // }
      if (!isTokenExpired(token.accessToken)) {
        return token;
      }
      return refreshAccessToken(token);
      //return token;
    },
    async session({ session, token }) {
      //console.log('token from session: ', token);
      if (token) {
        //session.accessToken = token.accessToken;
        //session.refreshToken = token.refreshToken;
        //session.user = token.user as any;
        session = {
          ...session,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          user: token.user as any,
        };
      }
      //console.log('session: ', session);
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
