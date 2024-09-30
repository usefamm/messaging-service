import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Your secret from .env

// Extend the Request type to include `user` property
interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

    if (!token) {
        res.status(401).json({ success: false, message: 'Access denied, no token provided' });
        return; // Return here to avoid calling `next()`
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach decoded token to req.user
        next(); // Call the next middleware or route handler
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
