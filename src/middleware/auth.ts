import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  user: {
    id: string;
    role: string;
  };
}

// Extend Express Request object to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload['user'];
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as JwtPayload;

      // Get user from the token payload and attach to request
      req.user = decoded.user;

      next();
      return; // CRITICAL: must return after calling next()
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      return; // CRITICAL: must return to prevent fall-through
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return; // CRITICAL: must return
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        message: `User role ${req.user?.role} is not authorized to access this route`,
      });
      return;
    }
    next();
  };
};
