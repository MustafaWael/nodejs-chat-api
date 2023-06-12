import { IUser } from './database/models/user';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      token: string;
    }
  }
}
