import { Request, Response, NextFunction } from 'express';
import { IVerifyOtpErrorResponse, IVerifyOtpRequestBody, IVerifyOtpSuccessResponse } from '../../../types/controllerTypes/otpControllerType/otpVerifyControllerType';
import otpSendVerifyGmail from '../../../models/auth/otpModel/otpModels';

export const verifyOtp = async (
  req: Request<{}, {}, IVerifyOtpRequestBody>,
  res: Response<IVerifyOtpSuccessResponse | IVerifyOtpErrorResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400).json({
        status: 400,
        message: 'Bad Request',
        errorDescription: ['Please provide both email and OTP.'],
      });
      return;
    }

    const otpEntry = await otpSendVerifyGmail.findOne({ email });

    if (!otpEntry) {
      res.status(404).json({
        status: 404,
        message: 'Not Found',
        errorDescription: ['OTP entry not found for this email.'],
      });
      return;
    }

    if (otpEntry.otp !== otp) {
      res.status(400).json({
        status: 400,
        message: 'Bad Request',
        errorDescription: ['Invalid OTP. Please try again.'],
      });
      return;
    }

    res.status(201).json({
      status: 201,
      message: 'Email verified successfully',
      responseDro: ['OTP verified successfully'],
    });

  } catch (error: any) {
    console.error('Error', error);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      errorDescription: ['An error occurred while verifying the OTP.'],
    });
    next(error);
  }
};
