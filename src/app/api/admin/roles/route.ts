import { auth } from "@/auth";
import baseAPI_URL from "@/utils/baseAPI_URL";
import { NextResponse } from "next/server";
export const GET = async () => {
    try {
        const session = await auth();
        //console.log("session: ", session);
        const res = await fetch(`${baseAPI_URL}/admin/roles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${session?.accessToken}; refreshToken=${session?.refreshToken}`,
            },
        });
        if (!res.ok) {
            const { message } = await res.json();
            throw new Error(message);
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch ( error : any ) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};