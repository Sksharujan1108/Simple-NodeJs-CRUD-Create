import mongoose, { Schema } from 'mongoose';
import { IGmail } from '../../../types/modelsTypes/otpModelsType/otpModelType';

const checkGmailSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
})

const Gmail =  mongoose.model<IGmail>('Gmail', checkGmailSchema)
export default Gmail;
