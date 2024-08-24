import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto'; 
import { ICheckGmailErrorResponse, ICheckGmailRequestBody, ICheckGmailSuccessResponse } from '../../../types/controllerTypes/otpControllerType/otpSendControllerType';
import { emailRegex } from '../../../utils/validationUtils';
import mailConfig from '../../../utils/helpers/mailConfig';
import otpSendVerifyGmail from '../../../models/auth/otpModel/otpModels';

export const sendOtpGmail = async (
  req: Request<{}, {}, ICheckGmailRequestBody>,
  res: Response<ICheckGmailSuccessResponse | ICheckGmailErrorResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        status: 400,
        message: 'Bad Request',
        errorDescription: ['Please provide email.'],
      });
      return;
    }

    if (!emailRegex.test(email)) {
      res.status(400).json({
        status: 400,
        message: 'Bad Request',
        errorDescription: ['Invalid email format. Please provide a valid email address.'],
      });
      return;
    }

    const otp = crypto.randomInt(1000, 9999).toString();

    const result = await otpSendVerifyGmail.findOneAndUpdate(
      { email },
      { otp, isVerified: false, createdAt: new Date() },
      { upsert: true, new: true }
    );
    console.log('user Result', result);

     // Send OTP to the email (simulated for now)
     console.log(`OTP sent to ${email}: ${otp}`);
    

    await mailConfig(email, otp);

    res.status(201).json({
      status: 201,
      message: 'Email verified successfully',
      responseDro: ['OTP has been sent to your email'],
    });

  } catch (error: any) {
    console.error('Error', error);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      errorDescription: ['An error occurred while sending the OTP.'],
    });
    next(error);
  }
};
