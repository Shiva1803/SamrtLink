import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const secret = process.env.JWT_SECRET || 'your-secret-key';

    const decoded = jwt.verify(token, secret) as { userId: string };
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

