import { IUser } from '../database/models/user';

interface UserWithoutSensitiveData {
  _id: string;
  name: string;
  email: string;
}

export const removeSensitiveData = (user: IUser): UserWithoutSensitiveData => {
  const { name, email, _id } = user;

  return {
    _id,
    name,
    email,
  };
};
