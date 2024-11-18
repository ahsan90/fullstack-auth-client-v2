import { auth } from "@/auth";
import baseAPI_URL from "../utils/baseAPI_URL";
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