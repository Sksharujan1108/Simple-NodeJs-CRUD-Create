// Define types for the request body
export interface IRegisterCreateUserRequestBody {
    userName: string;
    email: string;
    contactNumber: string;
    password: string;
    confirmPassword: string;
  }
  
  // Define types for the response
  export interface IRegisterCreateUserSuccessResponse {
    status: number;
    message: string;
    responseDto: {
      userName: string;
      email: string;
      contactNumber: string;
    };
  }
  
  export interface IRegisterCreateUserErrorResponse {
    status: number;
    message: string;
    errorDescription: string[];
  }
  