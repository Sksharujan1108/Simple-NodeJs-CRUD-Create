// Define types for the request body
export interface ILoginRequestBody {
    email: string;
    password: string;
  }
  
  // Define types for the response
  export interface ILoginSuccessResponse {
    status: number;
    message: string;
    responseDto: {
        jwtToken: string;
        refreshToken: string
    };
  }
  
  export interface ILoginErrorResponse {
    status: number;
    message: string;
    errorDescription: string[];
  }
  