// Define types for the request body
export interface IVerifyOtpRequestBody {
    email: string;
    otp: string;
  }
  // Define types for the response
  export interface IVerifyOtpSuccessResponse {
    status: number;
    message: string;
    responseDro: string[]
  }
  
  export interface IVerifyOtpErrorResponse {
    status: number;
    message: string;
    errorDescription: string[];
  }
  