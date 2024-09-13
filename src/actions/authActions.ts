"use server";
import {
  loginSchema,
  passwordResetSchema,
  requestPasswordSchema,
} from "@/_lib/validateSchemas";
import { isTokenExpired } from "@/_utils/isTokenExpired";
import baseAPI_URL from "@/_utils/baseAPI_URL";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import * as z from "zod";
import { revalidatePath } from "next/cache";

export const login = async (data: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    console.log("Invalid field values!");
    throw new Error("Invalid field values!");
  }

  try {
    const { email, password } = validatedFields.data;
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      //redirectTo: "/",
    });
    return { success: true };
  } catch (error) {
    /*
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = error.message;
      });
      return { success: false, errors: fieldErrors };
    }
    */

    // if (error instanceof AuthError) {
    //   return { success: false, error: error.cause?.err?.message };
    // }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid email or password!" };
        default:
          return { success: false, error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    const session = await auth();
    const response = await fetch(`${baseAPI_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie:
          session?.accessToken && !isTokenExpired(session?.accessToken)
            ? `accessToken=${session?.accessToken}; refreshToken=${session?.refreshToken}`
            : `refreshToken=${session?.refreshToken}`,
      },
    });
    if (!response.ok) {
      const { message } = await response.json();
      console.log("err:- ", message);
      return { success: false, error: message };
    }
    console.log("logout server action called!");
    revalidatePath("/", "layout");
    await signOut({ redirectTo: "/login" });

    //return { success: true };
  } catch (error) {
    // if (error instanceof Error) {
    //   return { success: false, error: error.message };
    // }
    console.log("err:- ", error);
    throw error;
  }
};

export const loggedInRedirectPath = async () => {
  try {
    const session = await auth();
    revalidatePath("/", "layout");
    if (session?.accessToken && session?.user?.role === "ADMIN") {
      return { success: true, path: "/admin/users" };
    } else if (session?.accessToken && session?.user?.role === "USER") {
      return { success: true, path: "/dashboard/profile" };
    }
  } catch (error) {
    return { success: false, path: "/login" };
  }
};

export const sendPassResetLink = async (
  data: z.infer<typeof requestPasswordSchema>
) => {
  try {
    const validatedFields = requestPasswordSchema.safeParse(data);
    if (!validatedFields.success) {
      throw new Error("Invalid field values!");
    }
    const response = await fetch(`${baseAPI_URL}/auth/request-password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: validatedFields.data.email }),
    });
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    const { message, resetToken, email } = await response.json();
    return { success: true, message, resetToken, email };
  } catch (error: any) {
    // if (error instanceof z.ZodError) {
    //   const fieldErrors: Record<string, string> = {};
    //   error.errors.forEach((err) => {
    //     fieldErrors[err.path[0]] = error.message;
    //   });
    //   return { success: false, errors: fieldErrors };
    // }
    // if (error instanceof Error) {
    //   return { success: false, error: error.message };
    // }
    return { success: false, error: error.message };
  }
};

export const resetPassword = async (
  data: z.infer<typeof PasswordResetPayloadSchema>
) => {
  //const validatedFields = passwordResetSchema.parse(data);
  try {
    const validatedProps = PasswordResetPayloadSchema.safeParse(data);
    if (!validatedProps.success) {
      throw new Error("Invalid field values!");
    }
    const { resetToken, id, newPassword } = data;
    const response = await fetch(`${baseAPI_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetToken, id, newPassword }),
    });
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    const { message } = await response.json();
    return { success: true, message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const varifyResetToken = async (data: {
  resetToken: string;
  userId: string;
}) => {
  try {
    if (!data.resetToken || !data.userId) {
      throw new Error("Invalid reset token info!");
    }
    const res = await fetch(`${baseAPI_URL}/auth/varify-reset-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resetToken: data.resetToken,
        userId: data.userId,
      }),
    });
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }
    const { isValid } = await res.json();
    return { success: true, isValid };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

const PasswordResetPayloadSchema = z
  .object({
    resetToken: z.string(),
    id: z.string(),
    newPassword: z.string(),
  })
  .required();
