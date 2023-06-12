/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { AuthError } from '../../errors/AuthError';

export const authError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AuthError) {
    // Handle custom authentication errors
    res.status(401).json({ error: err.message });
  } else if (err instanceof JsonWebTokenError) {
    // Handle JWT related errors
    res.status(401).json({ error: 'Invalid token' });
  } else if (err) {
    // Handle other errors
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  } else {
    next();
  }
};

export default authError;
