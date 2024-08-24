import express, { Router } from 'express';
import { sendOtpGmail } from '../../controllers/auth/otpController/otpSendController';
import { verifyOtp } from '../../controllers/auth/otpController/otpVerifyController';
import createUser from '../../controllers/usersController';

const router: Router = express.Router();

// Define routes
router.post('/otpSend', sendOtpGmail);
router.post('/verifyOtp', verifyOtp);
router.post('/createUsers', createUser);

export default router;
