export interface RegisterPayload {
    fullName: string;
    email: string;
    address: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
}

export interface LoginResponse {
    message: string;
    accessToken: string;
}

export interface MeResponse {
    id: string;
    fullName: string;
    email: string;
    address: string;
    role: string;
    isActive?: boolean;
}
