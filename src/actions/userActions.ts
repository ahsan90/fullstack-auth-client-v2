"use server";

import {
  registerUserSchema,
  updateLoggedInUserSchema,
} from "@/_lib/validateSchemas";
import * as z from "zod";
import baseAPI_URL from "@/_utils/baseAPI_URL";
import { auth, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";

export const registerUser = async (
  data: z.infer<typeof registerUserSchema>
) => {
  try {
    const { name, email, password } = registerUserSchema.parse({ ...data });

    // Perform server-side action here (e.g., save to the database, send an email, etc.)
    const response = await fetch(`${baseAPI_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    //console.log("Registration successful", result);

    return { success: true };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      err.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      return { success: false, errors: fieldErrors };
    }
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const updateUser = async (
  data: z.infer<typeof updateLoggedInUserSchema>
) => {
  try {
    const validatedFields = updateLoggedInUserSchema.safeParse(data);
    if (!validatedFields.success) {
      throw new Error("Invalid field values!");
    }
    const updatePayload = !validatedFields.data.isPasswordChangeRequested
      ? { name: validatedFields.data.name, email: validatedFields.data.email }
      : {
          name: validatedFields.data.name,
          email: validatedFields.data.email,
          currentPassword: validatedFields.data.currentPassword,
          newPassword: validatedFields.data.newPassword,
        };
    //console.log("updatePayload: ", updatePayload);
    const session = await auth();
    const response = await fetch(`${baseAPI_URL}/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${session?.accessToken}; refreshToken=${session?.refreshToken}`,
      },
      body: JSON.stringify(updatePayload),
    });
    //console.log("response: ", (await response.json()).message);
    //console.log("response ok?: ", !response.ok);
    if (!response.ok) {
      //console.log("response ok inside if block?: ", await response.json());
      const { message, error } = await response.json();
      throw new Error(message || error);
    }
    revalidatePath("/dashboard/profile");
    return { success: true, message: "Profile updated successfully!" };
  } catch (err) {
    if (err instanceof Error) {
      console.log("err: ", err);
      return { success: false, message: err.message };
    }
    //throw err
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const loggedInUser = async () => {
  try {
    const session = await auth();
    const response = await fetch(`${baseAPI_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${session?.accessToken}; refreshToken=${session?.refreshToken}`,
      },
    });
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    return { success: true, user: await response.json() };
  } catch (err: any) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const deleteUser = async () => {
  try {
    const session = await auth();
    const response = await fetch(`${baseAPI_URL}/users/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${session?.accessToken}; refreshToken=${session?.refreshToken}`,
      },
    });
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    await signOut({ redirect: false });
    return { success: true };
    //return { success: true };
  } catch (err) {
    if (err instanceof AuthError) {
      return { success: false, error: err.message };
    } else if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    throw err;
    //return { success: false, error: "An unexpected error occurred" };
  } 
}