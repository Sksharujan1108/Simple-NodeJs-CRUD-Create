import express, { Request, Response, Router, NextFunction } from 'express';
import { createUser } from '../controllers/usersController';

const router: Router = express.Router();

// Define the route and use createUser as the handler
router.route('/createUsers').post((req: Request, res: Response, next: NextFunction) => {
  createUser(req, res, next);
});

export default router;