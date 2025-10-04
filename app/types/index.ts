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
  }
  
  export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }