import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer"; // Import nodemailer
import crypto from "crypto"; // For generating OTP
import { ICheckGmailErrorResponse, ICheckGmailRequestBody, ICheckGmailSuccessResponse } from "../../../types/controllerTypes/otpControllerType/otpControllerType";
import Gmail from "../../../models/auth/otpModel/otpModels";
import { emailRegex } from "../../../utils/validationUtils";

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider here
  auth: {
    user: 'sksharujan27@gmail.com', // Your email address
    pass: 'ucli tkpd npem praw', // Your email password or app password
  },
});

export const CheckGmail = async (
  req: Request<{}, {}, ICheckGmailRequestBody>,
  res: Response<ICheckGmailSuccessResponse | ICheckGmailErrorResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;

    // Check if the email is provided
    if (!email) {
      res.status(400).json({
        status: 400,
        message: "Bad Request",
        errorDescription: ["Please provide email."],
      });
      return;
    }

    // Validate the email format
    if (!emailRegex.test(email)) {
      res.status(400).json({
        status: 400,
        message: "Bad Request",
        errorDescription: [
          `Invalid email format, Please provide a valid email address.`
        ],
      });
      return;
    }

    // Check if the email is already registered
    const currentUser = await Gmail.findOne({ email });
    if (currentUser) {
      res.status(400).json({
        status: 400,
        message: "Bad Request",
        errorDescription: [
          "Email already registered. Please choose a different email.",
        ],
      });
      return;
    }

    // Generate a random OTP using Math.random()
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the OTP to the database
    await Gmail.findOneAndUpdate({ email }, { otp }, { upsert: true });

    // Send the OTP to the user's email
    await transporter.sendMail({
      from: 'sksharujan27@gmail.com',
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    });

    res.status(201).json({
      status: 201,
      message: "Email verified successfully",
      responseDro: [
        'OTP has been sent to your email'
      ]
    });

  } catch (error: any) {
    console.error("Error", error); // Use console.error for error logging
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      errorDescription: ["An error occurred while sending the OTP."],
    });
    next(error); // Pass the error to the next middleware
  }
};
