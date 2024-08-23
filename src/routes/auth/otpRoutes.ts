import express, { Request, Response, Router, NextFunction } from 'express';
import { CheckGmail } from '../../controllers/auth/otpController/otpController';

const router: Router = express.Router();

// Define the route and use Gmail as the handler
router.route('/otpSend').post((req: Request, res: Response, next: NextFunction) => {
    CheckGmail(req, res, next);
})

export default router;