import * as z from "zod";

export const loginSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Please enter your correct password" }),
  })
  .required();

export const registerUserSchema = z
  .object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const addUserSchema = z
  .object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password is required" }),
    role: z.enum(["ADMIN", "USER"], {
      errorMap: () => ({ message: "Role is required" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const updateUserSchema = z
  .object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    role: z.enum(["ADMIN", "USER"]),
    isPasswordChanged: z.boolean().optional(),
    currentPassword: z.string().optional(), // Make currentPassword optional
    newPassword: z.string().optional(), // Make newPassword optional
    confirmPassword: z.string().optional(), // Make confirmPassword optional
  })
  .refine(
    (data) => {
      // If newPassword is provided, currentPassword must also be provided
      if (data.isPasswordChanged && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Current password is required when changing password",
      path: ["currentPassword"], // Point to currentPassword for error
    }
  )
  .refine(
    (data) => {
      // If newPassword is provided, confirmPassword must also match
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"], // Point to confirmPassword for error
    }
  )
  .refine(
    (data) => {
      // If any password field is provided, ensure newPassword is at least 6 characters
      if (data.newPassword || data.confirmPassword || data.currentPassword) {
        return (data.newPassword?.length || 0) >= 6;
      }
      return true; // Skip if no password update is happening
    },
    {
      message: "New password must be at least 6 characters",
      path: ["newPassword"], // Point to newPassword for error
    }
  );

export const updateLoggedInUserSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  isPasswordChangeRequested: z.boolean().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if(data.isPasswordChangeRequested && !data.currentPassword) {
    return false;
  }
  return true;
}, {
  message: "Current password is required when changing password",
  path: ["currentPassword"],
}).refine((data) => {
  if(data.isPasswordChangeRequested && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => {
  if(data.isPasswordChangeRequested && (data.newPassword?.length || 0) < 6) {
    return false;
  }
  return true;
}, {
  message: "New password must be at least 6 characters",
  path: ["newPassword"],
})

export const requestPasswordSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email associated with your account",
    }),
});

export const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Enter a password with at least 6 characters!" }),
    confirm_password: z.string().min(6, { message: "Confirm Password" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match!",
  });
