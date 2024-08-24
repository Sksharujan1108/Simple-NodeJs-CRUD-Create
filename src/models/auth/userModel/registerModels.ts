import mongoose, { Schema } from 'mongoose';
import { IRegisterUser } from '../../../types/modelsTypes/userModelsTypes/registerModelsTypes'

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
  refreshTokens: [String], // Adjust to your needs
});

// Create and export the User model
const registerUser = mongoose.model<IRegisterUser>('registerUser', registerUserSchema);
export default registerUser;
