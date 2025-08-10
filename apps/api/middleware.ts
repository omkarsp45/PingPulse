import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    auth?: {
        userId: string;
    };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT secret not configured' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
        req.auth = { userId: decoded.id };

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}; 