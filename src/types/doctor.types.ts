export interface IDoctor {
    id: string;
    name: string;
    specialization: Record<string, unknown>[];
    experience: number;
    averageRating: number;
}