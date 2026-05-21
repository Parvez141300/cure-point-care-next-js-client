/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IAdminDashboardData, IDoctorDashboardData, IPatientDashboardData } from "@/types/dashboard.types";

export const getAdminDashboardData = async () => {
    try {
        const response = await httpClient.get<IAdminDashboardData>("/stats");
        return response;
    } catch (error: any) {
        console.log(`Error from get admin dashboard server action`, error);
        return {
            sucess: false,
            message: error.message || "An error occurred while fetching admin dashboard data",
            data: null,
            meta: null,
        } 
    }
}

export const getPatientDashboardData = async () => {
    try {
        const response = await httpClient.get<IPatientDashboardData>("/stats");
        return response;
    } catch (error: any) {
        console.log(`Error from get admin dashboard server action`, error);
        return {
            sucess: false,
            message: error.message || "An error occurred while fetching admin dashboard data",
            data: null,
            meta: null,
        } 
    }
}

export const getDoctorDashboardData = async () => {
    try {
        const response = await httpClient.get<IDoctorDashboardData>("/stats");
        return response;
    } catch (error: any) {
        console.log(`Error from get admin dashboard server action`, error);
        return {
            sucess: false,
            message: error.message || "An error occurred while fetching admin dashboard data",
            data: null,
            meta: null,
        } 
    }
}