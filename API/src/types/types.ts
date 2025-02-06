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

export interface ProfileRequest {
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

export interface EventRequest {
    title: string;
    description: string;
    category: string;
    banner: string;
    date: Date;
    time: string;
    duration: number;
    capacity: number;
    location: {
        name: string;
        address: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        };
    };
    organizer: {
        name: string;
        contactEmail: string;
        contactPhone?: string;
        website?: string;
    };
}

export interface EventUpdateRequest extends Partial<EventRequest> {}

export interface TicketRequest {
    eventId: string;
    ticketType: string;
    seatAssignment?: {
        section?: string;
        row?: string;
        seatNumber?: string;
    };
}

export interface TransferRequest {
    toUserId: string;
    transferReason?: string;
}