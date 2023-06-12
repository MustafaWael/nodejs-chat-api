import User, { IUser } from '../database/models/user';
import jwt, { Secret } from 'jsonwebtoken';

interface NewUser {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (newUser: NewUser): Promise<IUser> => {
  const createdUser = new User(newUser);
  await createdUser.save();

  return createdUser;
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email });
  return user;
};

export const updateUser = async (
  userId: string,
  updates: Partial<NewUser>,
): Promise<IUser> => {
  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
  });
  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser;
};

export const removeUser = async (userId: string): Promise<IUser> => {
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new Error('User not found');
  }

  return deletedUser;
};

export const generateToken = async (user: IUser): Promise<string> => {
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as Secret,
  );
  user.tokens.push(token);
  await user.save();

  return token;
};

export const removeAllTokens = async (user: IUser): Promise<void> => {
  user.tokens = [];
  await user.save();
};

export const removeSpecificToken = async (
  user: IUser,
  token: string,
): Promise<void> => {
  user.tokens = user.tokens.filter((t) => t !== token);
  await user.save();
};
