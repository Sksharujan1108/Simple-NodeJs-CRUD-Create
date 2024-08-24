import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload from jsonwebtoken
import { UserPayload } from '../types/express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized',
                errorDescription: ['No token provided or token is invalid.'],
            });
            return;
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized',
                errorDescription: ['Token not found in the authorization header.'],
            });
            return;
        }

        const secretKey = process.env.JWT_SECRET;

        if (!secretKey) {
            throw new Error('JWT_SECRET environmental variable is not defined');
        }

        // Verify token
        const decoded = jwt.verify(token, secretKey) as UserPayload;

        // Attach the decoded token payload to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error in authMiddleware:', error);
        res.status(401).json({
            status: 401,
            message: 'Unauthorized',
            errorDescription: ['Invalid token or token has expired.'],
        });
    }
};

export default authMiddleware;
