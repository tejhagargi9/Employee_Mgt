export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
  }

  export interface IEmployee {
    _id?: string;
    name: string;
    email: string;
    position: string;
    password?: string;
    createdAt?: Date;
    // Optional additional information
    personalInfo?: {
      dateOfBirth?: string;
      gender?: string;
      nationality?: string;
    };
    contacts?: {
      phone?: string;
      emergencyContact?: {
        name?: string;
        phone?: string;
        relationship?: string;
      };
    };
    salary?: {
      amount?: number;
      currency?: string;
      frequency?: 'monthly' | 'yearly' | 'hourly';
    };
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
  }
  
  export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }