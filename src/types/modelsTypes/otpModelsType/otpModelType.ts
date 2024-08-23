import { Document } from 'mongoose';

// Define the interface for the User document
export interface IGmail extends Document {
  email: string;
}