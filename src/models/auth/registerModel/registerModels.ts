import mongoose, { Schema } from 'mongoose';
import { IRegisterUser } from '../../../types/modelsTypes/registerModelsTypes/registerModelsTypes'

// Define the User schema with type annotations
const registerUserSchema: Schema<IRegisterUser> = new Schema({
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
  // otp: {
  //   type: String,
  //   required: false, // Optional: Only required when verifying OTP
  //   default: null,
  // },
});

// Create and export the User model
const registerUser = mongoose.model<IRegisterUser>('registerUser', registerUserSchema);
export default registerUser;
