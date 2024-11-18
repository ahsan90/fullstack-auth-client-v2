import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    user: {
      id: string;
      name: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}
import { JWT, User } from "next-auth/jwt";
declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      name: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}
