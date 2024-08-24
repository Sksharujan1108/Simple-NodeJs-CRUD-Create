import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ILoginErrorResponse, ILoginRequestBody, ILoginSuccessResponse } from '../../../types/controllerTypes/userControllerType/loginControllerType';
import registerUser from '../../../models/auth/userModel/registerModels';

const loginController = async  (req: Request<{}, {}, ILoginRequestBody>, res: Response<ILoginSuccessResponse | ILoginErrorResponse>, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Check for missing required fields
        if (!email || !password) {
            res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: ['Please input all required details.'],
            });
            return;
        }

        // Find the user by email
        const checkUser = await registerUser.findOne({ email });
        if (!checkUser) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized',
                errorDescription: ['Invalid email or password.'],
            });
            return;
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, checkUser.password);
        if (!isPasswordValid) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized',
                errorDescription: ['Invalid email or password.'],
            });
            return;
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { userId: checkUser._id, email: checkUser.email },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Generate Refresh token
        const refreshToken = jwt.sign(
            { userId: checkUser._id, email: checkUser.email },
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
        );

        // Save refresh token in user document
        checkUser.refreshTokens = checkUser.refreshTokens || [];
        checkUser.refreshTokens.push(refreshToken);
        await checkUser.save();

        
        // Send response with JWT token
        res.status(200).json({
            status: 200,
            message: 'Login successful',
            responseDto: { 
                jwtToken, 
                refreshToken 
            }
        });

    } catch (error) {
        console.error('Error', error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            errorDescription: ['An error occurred while logging in.'],
        });
        next(error);
    }
};

export default loginController;
