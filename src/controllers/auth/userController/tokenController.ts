import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import registerUser from '../../../models/auth/userModel/registerModels';

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: ['No refresh token provided.'],
            });
            return;
        }

        // Verify refresh token
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as { userId: string, email: string };
        } catch (error) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized',
                errorDescription: ['Invalid or expired refresh token.'],
            });
            return;
        }

        // Find the user and check if refresh token is valid
        const user = await registerUser.findOne({ _id: decoded.userId });
        if (!user || !user.refreshTokens.includes(refreshToken)) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized',
                errorDescription: ['Invalid refresh token.'],
            });
            return;
        }

        // Generate new JWT and refresh tokens
        const newJwtToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const newRefreshToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
        );

        // Replace old refresh token with new one
        user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
        user.refreshTokens.push(newRefreshToken);
        await user.save();

        res.status(200).json({
            status: 200,
            message: 'Token refreshed successfully',
            responseDto: { jwtToken: newJwtToken, refreshToken: newRefreshToken }
        });

    } catch (error) {
        console.error('Error', error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            errorDescription: ['An error occurred while refreshing the token.'],
        });
        next(error);
    }
};
