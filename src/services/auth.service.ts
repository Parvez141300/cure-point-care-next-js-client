"user server";

import { setTokenInCookie } from "@/lib/tokenUtils";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

if (!BASE_API_URL) {
    throw new Error('NEXT_PUBLIC_BASE_API_URL is not defined');
}

export async function refreshToken(refreshToken: string): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
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