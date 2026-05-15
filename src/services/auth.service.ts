"use server";

import { setTokenInCookie } from "@/lib/tokenUtils";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL

if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined');
}

export async function getNewTokenWithRefreshToken(refreshToken: string): Promise<boolean> {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `refreshToken=${refreshToken}`,
            },
        });

        if (!res.ok) {
            return false;
        }
        else {
            return true;
        }

        const data = await res.json();

        const { accessToken, refreshToken: newRefreshToken, token } = data;

        if (accessToken) {
            await setTokenInCookie("accessToken", accessToken);
        }
        if (newRefreshToken) {
            await setTokenInCookie("refreshToken", newRefreshToken);
        }
        if (token) {
            await setTokenInCookie("better-auth.session_token", token, 60 * 60 * 24); // 1 day
        }

        return true;
    } catch (error) {
        console.log(`error refreshing token ${error}`);
        return false;
    }
}

export const getUserInfo = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";

    if (!accessToken) {
        return null;
    }

    const res = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
        },
    });

    if (!res.ok) {
        return null;
    }

    const { data } = await res.json();

    return data;
}