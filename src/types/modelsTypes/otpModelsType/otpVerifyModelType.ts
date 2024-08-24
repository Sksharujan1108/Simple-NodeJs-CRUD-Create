import { Document } from 'mongoose';

// Define the interface for the User document
export interface IOtpVerifyGmail extends Document {
  email: string;
  otp: string;
}