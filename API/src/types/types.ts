export interface UserRequest {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

export interface EmailVerificationRequest {
    code: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    password: string;
}