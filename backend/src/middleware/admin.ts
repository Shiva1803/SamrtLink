import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    // If user is an admin, proceed to the next handler
    next();
  } catch (error) {
    res.status(500).json({ message: 'Failed to verify admin status', error });
  }
};