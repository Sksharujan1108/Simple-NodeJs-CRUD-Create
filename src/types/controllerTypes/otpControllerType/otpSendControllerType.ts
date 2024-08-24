// Define types for the request body
export interface ICheckGmailRequestBody {
    email: string;
  }
  // Define types for the response
  export interface ICheckGmailSuccessResponse {
    status: number;
    message: string;
    responseDro: string[]
  }
  
  export interface ICheckGmailErrorResponse {
    status: number;
    message: string;
    errorDescription: string[];
  }
  