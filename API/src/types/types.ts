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

interface ProfileRequest {
    firstname?: string;
    lastname?: string;
    social_links?: {
      youtube?: string;
      instagram?: string;
      facebook?: string;
      twitter?: string;
      website?: string;
    };
    profileImage?: string; // This will be the AWS S3 link
  }