import { Request, Response, NextFunction } from 'express';
import { phoneRegex, passwordRegex, emailRegex } from '../../../utils/validationUtils';
import { validate } from 'deep-email-validator';
import bcrypt from 'bcrypt';
import { IRegisterCreateUserRequestBody, IRegisterCreateUserSuccessResponse, IRegisterCreateUserErrorResponse } from '../../../types/controllerTypes/registerControllerType/registerControllerType';
import registerUser from '../../../models/auth/registerModel/registerModels';
import otpSendVerifyGmail from '../../../models/auth/otpModel/otpModels';

const registerUserCreate = async (req: Request<{}, {}, IRegisterCreateUserRequestBody>, res: Response<IRegisterCreateUserSuccessResponse | IRegisterCreateUserErrorResponse>, next: NextFunction): Promise<void> => {
    try {
        const { userName, email, contactNumber, password, confirmPassword } = req.body;

        // Check for missing required fields
        if (!userName || !email || !contactNumber || !password || !confirmPassword) {
            res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: [
                    'Please input all required details.'
                ],
            });
            return;
        }

        // Check if email is verified
        const otpRecord = await otpSendVerifyGmail.findOne({ email });
        if (!otpRecord || !otpRecord.isVerified) {
            res.status(400).json({
              status: 400,
              message: 'Bad Request',
              errorDescription: ['Email is not verified. Please verify your email before registering.'],
            });
            return;
          }

        // Check if the email is already registered
        const existingUser = await registerUser.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: [
                    'Email already registered. Please choose a different email.'
                ],
            });
            return;
        }

        // Validate the email
        // const validationResult = await validate(email);
        if (!emailRegex.test(email)) {
            res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: [
                    'Invalid email format. Please provide a valid email address.'
                ],
            });
            return;
        }

        // Validate phone number (10 digits)
        if (!phoneRegex.test(contactNumber)) {
            res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: [
                    'Contact number must be exactly 10 digits.'
                ],
            });
            return;
        }

        // Validate password strength
        if (!passwordRegex.test(password)) {
            res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: [
                    'Password must be at least 10 characters long and include uppercase letters, lowercase letters, numbers, and special characters.'
                ],
            });
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: [
                    'Password Mismatch'
                ],
            });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new registerUser({ 
            userName, 
            email, 
            contactNumber, 
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success
        res.status(201).json({
            status: 201,
            message: 'Register successfully',
            responseDto: {
                userName: newUser.userName,
                email: newUser.email,
                contactNumber: newUser.contactNumber,
                // Avoid sending passwords in response
            },
        });

    } catch (error) {
        console.error('Error', error); // Use console.error for error logging
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            errorDescription: [
                'An error occurred while creating the user.'
            ],
        });
        next(error); // Pass the error to the next middleware
    }
};

export default registerUserCreate;
