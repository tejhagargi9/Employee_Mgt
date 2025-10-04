export interface IEmployee {
    _id?: string;
    name: string;
    email: string;
    position: string;
    createdAt?: Date;
  }
  
  export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }