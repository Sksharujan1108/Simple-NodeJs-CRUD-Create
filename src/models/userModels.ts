import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/modelsTypes/userModelsTypes'

// Define the User schema with type annotations
const UserSchema: Schema<IUser> = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    default: null,
  },
  contactNumber: {
    type: String,
    required: true,
    default: null,
  },
  password: {
    type: String,
    required: true,
    default: null,
  },
  confirmPassword: {
    type: String,
    required: true,
    default: null,
  },
  // otp: {
  //   type: String,
  //   required: false, // Optional: Only required when verifying OTP
  //   default: null,
  // },
});

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
