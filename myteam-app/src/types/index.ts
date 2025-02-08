export type User = {
    id: string;
    name: string;
    email: string;
};

export interface Team {
    id: string;
    name: string;
    members: User[];
}

export type ApiResponse<T> = {
    data: T;
    error?: string;
};