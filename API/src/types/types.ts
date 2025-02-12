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
    basicInfo: {
      title: string;
      description: string;
      category: 'concert' | 'conference' | 'workshop' | 'sports' | 'exhibition' | 'other';
      tags?: string[];
      status?: 'draft' | 'published' | 'cancelled' | 'postponed' | 'completed';
    };
    media: {
      banner: string;
      files?: Array<{
        name: string;
        url: string;
        type: string;
      }>;
    };
    datetime: {
      date: string;
      time: string;
      duration: number;
      setupTime?: string;
      teardownTime?: string;
    };
    location: {
      name: string;
      address: string;
      city: string;
      state: string;
      country: string;
      zipcode: string;
      coordinates?: {
        latitude: number;
        longitude: number;
      };
    };
    capacity: {
      total: number;
      ageRestriction?: {
        minimum?: number;
        maximum?: number;
        required?: boolean;
      };
    };
    organizer: {
      name: string;
      contactEmail: string;
      contactPhone?: string;
      website?: string;
      socialMedia?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedIn?: string;
      };
    };
    schedule?: Array<{
      time: string;
      title: string;
      description: string;
      speaker?: {
        name: string;
        bio?: string;
        photo?: string;
        email?: string;
      };
    }>;
    ticketing?: Array<{
      name: string;
      price: number;
      quantity: number;
      description: string;
      earlyBirdDeadline?: string;
      earlyBirdPrice?: number;
    }>;
    additionalInfo?: {
      entryRequirements?: {
        dressCode?: string;
        isRequired?: boolean;
        additionalRequirements?: string[];
      };
      parking?: {
        available: boolean;
        information?: string;
        fee?: number;
      };
      accessibility?: {
        wheelchairAccessibile: boolean;
        assistanceAvailable: boolean;
        additionalInfo?: string;
      };
    };
    policies?: {
      refund?: string;
      cancellation?: string;
      photography?: string;
      weather?: string;
    };
  }
  
  // For update requests, make all fields optional
//   export type EventUpdateRequest = Partial<EventRequest>;
  
  // If you need a response type
  export interface EventResponse extends EventRequest {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
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