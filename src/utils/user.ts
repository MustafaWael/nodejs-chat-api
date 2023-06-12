import { IUser } from '../database/models/user';

interface UserWithoutSensitiveData {
  name: string;
  email: string;
}

export const removeSensitiveData = (user: IUser): UserWithoutSensitiveData => {
  const { name, email } = user;

  return {
    name,
    email,
  };
};
