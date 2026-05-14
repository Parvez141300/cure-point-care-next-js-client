"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./cookieUtils";

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

const getTokenSecondsRemaining = (token: string): number => {
    if (!token) return 0;

    try {
        const tokenPayload = JWT_ACCESS_TOKEN_SECRET ? jwt.verify(token, JWT_ACCESS_TOKEN_SECRET) as JwtPayload : jwt.decode(token) as JwtPayload;

        if (!tokenPayload) {
            return 0;
        }

        if (tokenPayload && !tokenPayload.exp) {
            return 0;
        }

        const remainingSeconds = tokenPayload.exp ? tokenPayload.exp - Math.floor(Date.now() / 1000) : 0;
        return remainingSeconds > 0 ? remainingSeconds : 0;
    } catch (error) {
        console.log('Error decoding token: ', error);
        return 0;
    }
};


export const setTokenInCookie = async (name: string, token: string, fallbackMaxAgeInSeconds = 60 * 60 * 24) => {
    let maxAgeInSeconds;

    if (name !== "better-auth.session_token") {
        maxAgeInSeconds = getTokenSecondsRemaining(token);
    }

    await setCookie(name, token, maxAgeInSeconds || fallbackMaxAgeInSeconds);
};

export const isTokenExpiringSoon = async (token: string, thresholdSeconds = 300): Promise<boolean> => {
    const remainingSeconds = getTokenSecondsRemaining(token);
    return remainingSeconds > 0 && remainingSeconds <= thresholdSeconds;
};

export const isTokenExpired = async (token: string): Promise<boolean> => {
    const remainingSeconds = getTokenSecondsRemaining(token);
    return remainingSeconds === 0;
};