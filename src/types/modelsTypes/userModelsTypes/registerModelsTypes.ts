import { Document } from 'mongoose';

// Define the interface for the User document
export interface IRegisterUser extends Document {
  userName: string;
  email: string;
  contactNumber: string;
  password: string;
  confirmPassword?: string;
  refreshTokens: string[]; // Ensure this matches what you need
  // otp: string;
}
