import mongoose, { Schema } from 'mongoose';

// Define an interface for the User document
interface UserSchemaType {
  userName: string;
  email: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
}

// Define the User schema with type annotations
const UserSchema: Schema = new Schema({
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
});

// Create and export the User model
const User = mongoose.model<UserSchemaType>('User', UserSchema);
export default User;
