export interface IApiResponse<TData = unknown> {
    success: boolean;
    message: string;
    data: TData;
    meta?: IPaginationMeta;
}

export interface IPaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IApiErrorResponse {
    success: boolean;
    message: string;
}