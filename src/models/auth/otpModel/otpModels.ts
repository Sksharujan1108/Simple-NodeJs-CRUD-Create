import mongoose, { Schema } from 'mongoose';
import { IOtp } from '../../../types/modelsTypes/otpModelsType/otpSendModelType';

const otpSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // Document expires after 5 minutes
  },
});

const otpSendVerifyGmail = mongoose.model<IOtp>('otpSendGmail', otpSchema);
export default otpSendVerifyGmail;
