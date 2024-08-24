import express, { Router } from 'express';
import { sendOtpGmail } from '../../controllers/auth/otpController/otpSendController';
import { verifyOtp } from '../../controllers/auth/otpController/otpVerifyController';
import registerUserCreate from '../../controllers/auth/userController/registerController';
import loginController from '../../controllers/auth/userController/loginController';
import { refreshToken } from '../../controllers/auth/userController/tokenController';

const router: Router = express.Router();

// Define routes
router.post('/otpSend', sendOtpGmail);
router.post('/verifyOtp', verifyOtp);
router.post('/registerUsers', registerUserCreate);
router.post('/loginUser', loginController);
router.post('/refreshToken', refreshToken);

export default router;
