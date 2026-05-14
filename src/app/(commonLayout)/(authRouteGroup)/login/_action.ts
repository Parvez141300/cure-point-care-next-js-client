/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookie } from "@/lib/tokenUtils";
import { IApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const loginAction = async (payload: ILoginPayload, redirectPath?: string): Promise<ILoginResponse | IApiErrorResponse> => {
    const parsedPayload = loginZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid inputs";
        return {
            success: false,
            message: firstError,
        };
    };

    try {
        const response = await httpClient.post<ILoginResponse>("/auth/login", parsedPayload.data);

        // set tokens in cookies from server to client
        const { accessToken, refreshToken, token, user } = response.data;
        const { role, emailVerified, needPasswordChange, email } = user;

        // set tokens in cookies
        await setTokenInCookie("accessToken", accessToken);
        await setTokenInCookie("refreshToken", refreshToken);
        await setTokenInCookie("better-auth.session_token", token, 60 * 60 * 24); // 1 day

        if (!emailVerified) {
            redirect("/verify-email");
        }
        else if (needPasswordChange) {
            // TODO: refactoring
            redirect(`/reset-password?email=${email}`);
        }
        else {
            const targetPath = redirectPath && isValidRedirectForRole(redirectPath, role as UserRole) ? redirectPath : getDefaultDashboardRoute(role as UserRole);

            redirect(targetPath);
        }
        
    } catch (error: any) {
        if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        return {
            success: false,
            message: `Login Failed: ${error.message}`,
        };
    }
}