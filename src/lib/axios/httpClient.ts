import { IApiResponse } from '@/types/api.types';
import axios from 'axios';

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!NEXT_PUBLIC_API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
};

export const axiosInstance = () => {
    const instance = axios.create({
        baseURL: NEXT_PUBLIC_API_BASE_URL,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
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
        const instance = axiosInstance();
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
        const instance = axiosInstance();
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
        const instance = axiosInstance();
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
        const instance = axiosInstance();
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
        const instance = axiosInstance();
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