import mongoose, { Schema, Document } from 'mongoose';
import { ILoginUser } from '../../../types/modelsTypes/userModelsTypes/loginModelType';

const loginUserSchema: Schema<ILoginUser> = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    refreshToken: { 
        type: String 
    }
});

const LoginUser = mongoose.model<ILoginUser>('LoginUser', loginUserSchema);
export default LoginUser;
