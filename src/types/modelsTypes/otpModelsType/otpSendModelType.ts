import { Document } from 'mongoose';

// Define the interface for the User document
export interface IOtp extends Document {
  email: string;
  otp: string;
}