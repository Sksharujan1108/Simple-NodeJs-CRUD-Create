// /types/express.d.ts

import { Request } from 'express';

interface UserPayload {
    userId: string;
    email: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserPayload | undefined; // Optional user property on Request
    }
}
