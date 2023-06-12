import { User } from '../database/models/';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { NextFunction, Request, Response } from 'express';
import { AuthError } from '../errors/AuthError';

type jwtPayload = JwtPayload & { userId: string };

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') as string;

    if (!token) {
      throw new AuthError('No token provided');
    }

    const decoded = jwt.verify(token, JWT_SECRET as Secret) as jwtPayload;

    const user = await User.findOne({
      _id: decoded?.userId,
      tokens: { $in: token },
    });

    if (!user) {
      throw new AuthError('User not found');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
