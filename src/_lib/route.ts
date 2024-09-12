export const public_routes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/api/auth/*"
];

export const protected_routes = [
  "/admin/users",
  "/admin/profile",
  "/dashboard",
  "/dashboard/profile",
];

export const private_user_routes = [
  "/dashboard/profile",
];

export const admin_user_routes = [
  "/admin/users",
  "/admin/profile",
];

export const auth_routes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/api/auth/*"
];