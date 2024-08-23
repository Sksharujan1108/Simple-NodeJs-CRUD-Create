// Define types for the request body
export interface ICreateUserRequestBody {
    userName: string;
    email: string;
    contactNumber: string;
    password: string;
    confirmPassword: string;
  }
  
  // Define types for the response
  export interface ICreateUserSuccessResponse {
    status: number;
    message: string;
    responseDto: {
      userName: string;
      email: string;
      contactNumber: string;
    };
  }
  
  export interface ICreateUserErrorResponse {
    status: number;
    message: string;
    errorDescription: string[];
  }
  