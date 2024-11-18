import { auth } from "@/auth";
import baseAPI_URL from "../utils/baseAPI_URL";
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