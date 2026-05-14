import { IApiResponse } from '@/types/api.types';
import axios from 'axios';
import { isTokenExpiringSoon } from '../tokenUtils';
import { cookies, headers } from 'next/headers';
import { getNewTokenWithRefreshToken } from '@/services/auth.service';

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!NEXT_PUBLIC_API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
};

export const tryRefreshToken = async (accessToken: string, refreshToken: string): Promise<void> => {
    if (!isTokenExpiringSoon(accessToken)) {
        return;
    }

    const requestheader = await headers();

    if (requestheader.get("x-token-refreshred")) {
        return; // avoid multiple refresh lifecycle
    }

    try {
        await getNewTokenWithRefreshToken(refreshToken);
    } catch (error) {
        console.error("Error refreshing token:", error);
    }
};

export const axiosInstance = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value || "";
    const refreshToken = cookieStore.get("refreshToken")?.value || "";

    if (accessToken && refreshToken) {
        await tryRefreshToken(accessToken, refreshToken);
    }

    // eg: "accessToken=123; refreshToken=456; better-auth.session_token=789"
    const cookieHeader = cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");

    const instance = axios.create({
        baseURL: NEXT_PUBLIC_API_BASE_URL,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookieHeader,
        },
    });

    return instance;
};

export interface ApiRequestOptions {
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
};

const httpGet = async <TData>(endpoint: string, options?: ApiRequestOptions): Promise<IApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.get<IApiResponse<TData>>(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });

        return response.data;
    } catch (error) {
        console.error(`GET ${endpoint} failed:`, error);
        throw error;
    }
};

const httpPost = async <TData>(endpoint: string, data?: unknown, options?: ApiRequestOptions): Promise<IApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.post<IApiResponse<TData>>(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });

        return response.data;
    } catch (error) {
        console.error(`POST ${endpoint} failed:`, error);
        throw error;
    }
};

const httpPut = async <TData>(endpoint: string, data?: unknown, options?: ApiRequestOptions): Promise<IApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.put<IApiResponse<TData>>(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });

        return response.data;
    } catch (error) {
        console.error(`PUT ${endpoint} failed:`, error);
        throw error;
    }
};

const httpPatch = async <TData>(endpoint: string, data?: unknown, options?: ApiRequestOptions): Promise<IApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.patch<IApiResponse<TData>>(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });

        return response.data;
    } catch (error) {
        console.error(`PATCH ${endpoint} failed:`, error);
        throw error;
    }
};

const httpDelete = async <TData>(endpoint: string, options?: ApiRequestOptions): Promise<IApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.delete<IApiResponse<TData>>(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });

        return response.data;
    } catch (error) {
        console.error(`DELETE ${endpoint} failed:`, error);
        throw error;
    }
};

export const httpClient = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    patch: httpPatch,
    delete: httpDelete,
};