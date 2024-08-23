import { Document } from 'mongoose';

// Define the interface for the User document
export interface IOtp extends Document {
    _id: string;
    email: string;
    otp: string;
    createdAt: Date;
}