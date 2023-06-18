import jwt, { Secret } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const resetPasswordToken = (userId: string) =>
  jwt.sign({ userId }, JWT_SECRET as Secret, {
    expiresIn: '1h',
  });
