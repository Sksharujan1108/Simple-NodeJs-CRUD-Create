import express, { Router } from 'express';
import { sendOtpGmail } from '../../controllers/auth/otpController/otpSendController';
import { verifyOtp } from '../../controllers/auth/otpController/otpVerifyController';
import registerUserCreate from '../../controllers/auth/registerController/registerController';

const router: Router = express.Router();

// Define routes
router.post('/otpSend', sendOtpGmail);
router.post('/verifyOtp', verifyOtp);
router.post('/registerUsers', registerUserCreate);

export default router;
