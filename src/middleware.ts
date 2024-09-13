import authconfig from "@/auth.config";
import * as route from "@/_lib/route";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

//const { auth } = NextAuth(authconfig);

export async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;
  const isAdminUser = session?.accessToken && session?.user?.role === "ADMIN";
  const isNormalUser = session?.accessToken && session?.user?.role === "USER";

  //   const isPublicRoutes = public_routes.find((route) =>
  //     pathname.startsWith(route.path)
  //   );
  const isProtectedRoutes = route.protected_routes.includes(pathname);
  const isPublicRoutes = route.public_routes.includes(pathname);
  const isAuthRoutes = route.auth_routes.includes(pathname);
  const isPrivateUserRoutes = route.private_user_routes.includes(pathname);
  const isAdminRoutes = route.admin_user_routes.includes(pathname);

  if (isProtectedRoutes && !isAdminUser && !isNormalUser && !isPublicRoutes) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (
    isAuthRoutes &&
    isAdminUser &&
    !isNormalUser
  ) {
    return NextResponse.redirect(new URL("/admin/users", req.url));
  }
  if (
    isAuthRoutes &&
    !isAdminUser &&
    isNormalUser
  ) {
    return NextResponse.redirect(new URL("/dashboard/profile", req.url));
  }

  if (
    isAdminRoutes &&
    !isAdminUser &&
    isNormalUser
  ) {
    return NextResponse.redirect(new URL("/dashboard/profile", req.url));
  }
  if (
    isPrivateUserRoutes &&
    isAdminUser &&
    !isNormalUser
  ) {
    return NextResponse.redirect(new URL("/admin/profile", req.url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
