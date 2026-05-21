"use server";
import { httpClient } from "@/lib/axios/httpClient"

interface IDoctor {
    id: string;
    name: string;
    specialization: Record<string, unknown>[];
    experience: number;
    averageRating: number;
}

export const getDoctors = async () => {
    const doctors = await httpClient.get<IDoctor[]>("/doctors");
    return doctors.data;
}