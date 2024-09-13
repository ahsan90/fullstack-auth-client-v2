"use server";
import { addUserSchema, updateUserSchema } from "@/_lib/validateSchemas";
import { auth, signOut } from "@/auth";
import * as z from "zod";
import baseAPI_URL from "@/_utils/baseAPI_URL";
import { revalidatePath } from "next/cache";

export const addUser = async (data: z.infer<typeof addUserSchema>) => {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return { success: false, error: "Not authorized!" };
    }
    const validatedFields = addUserSchema.safeParse(data);
    if (!validatedFields.success) {
      throw new Error("Invalid field values!");
    }
    const { name, email, password, role } = validatedFields.data;
    const res = await fetch(`${baseAPI_URL}/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${session?.accessToken}; refreshToken=${session?.refreshToken}`,
      },
      body: JSON.stringify({ name, email, password, role }),
    });
    if (!res.ok) {
      const { message, error } = await res.json();
      console.log(message || error);
      throw new Error(message || error);
    }
    revalidatePath("/admin/users");
    return { success: true, data: await res.json() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateUser = async (
  id: string,
  data: z.infer<typeof updateUserSchema>
) => {
  console.log("data: ", data);
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return { success: false, error: "Not authorized!" };
    }
    const validatedFields = updateUserSchema.safeParse(data);
    if (!validatedFields.success) {
      throw new Error("Invalid field values!");
    }
    const { name, email, role, currentPassword, newPassword } =
      validatedFields.data;
    const updatePayload =
      currentPassword && newPassword
        ? { name, email, role, currentPassword, newPassword }
        : { name, email, role };
    const res = await fetch(`${baseAPI_URL}/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${session?.accessToken}; refreshToken=${session?.refreshToken}`,
      },
      body: JSON.stringify(updatePayload),
    });
    if (!res.ok) {
      const { message, error } = await res.json();
      console.log(message || error);
      throw new Error(message || error);
    }
    revalidatePath("/admin/users");
    return { success: true, data: { message: "User updated successfully" } };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteUser = async (id: string) => {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return { success: false, error: "Not authorized" };
    }
    const response = await fetch(`${baseAPI_URL}/admin/users/${id}`, {
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
    const data = await response.json();
    if (session?.user?.id === data.deletedUser.id) {
      //revalidatePath("/login");
      console.log("redirecting to login");
      signOut({ redirect: false });
    }
    revalidatePath("/admin/users");
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getAllUsers = async () => {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return { success: false, error: "Not authorized" };
    }
    const response = await fetch(`${baseAPI_URL}/admin/users`, {
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
    return { success: true, users: await response.json() };
  } catch (err: any) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const getUserRoles = async () => {
  try {
    const session = await auth();
    const response = await fetch(`${baseAPI_URL}/admin/roles`, {
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
    return { success: true, roles: await response.json() };
  } catch (err: any) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
};
