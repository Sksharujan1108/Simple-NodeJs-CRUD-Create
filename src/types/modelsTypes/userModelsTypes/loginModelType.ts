import { Document } from 'mongoose';

// Define the interface for the User document
export interface ILoginUser extends Document {
  email: string;
  password: string;
  refreshToken?: string; // Optional field for refresh tokens
  // otp: string;
}
