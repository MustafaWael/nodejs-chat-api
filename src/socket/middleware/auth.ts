import { ExtendedError } from 'socket.io/dist/namespace';
import { SocketType } from '../index';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { User } from '../../database/models';
import { AuthError } from '../../errors/AuthError';

type jwtPayload = JwtPayload & { userId: string };

export const authMiddleware = async (
  socket: SocketType,
  next: (err: ExtendedError | undefined) => void,
) => {
  try {
    const token = socket.handshake.auth.token;
    socket.data.user;

    if (!token) {
      return next(new Error('No token provided'));
    }

    const decoded = jwt.verify(token, JWT_SECRET as Secret) as jwtPayload;

    const user = await User.findOne({
      _id: decoded?.userId,
      tokens: { $in: token },
    });

    if (!user) {
      throw new AuthError('User not found');
    }

    socket.data.user = user;
    socket.data.token = token;
    next(undefined);
  } catch (err) {
    console.log(err);

    next(err as ExtendedError);
  }
};
