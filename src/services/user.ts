import User, { IUser } from '../database/models/user';
import jwt, { Secret } from 'jsonwebtoken';
import { resetPasswordToken } from '../utils/jwtUtils';
import { UserErrror } from '../errors/UserError';

interface NewUser {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (newUser: NewUser): Promise<IUser> => {
  // check if the email is already in use
  const user = await User.findOne({ email: newUser.email });

  if (user) {
    throw new UserErrror('Email already exists');
  }

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

export const forgotPassword = async (email: string): Promise<string> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new UserErrror('User not found');
  }

  const resetToken = resetPasswordToken(user._id);

  // Store the reset token and expiration in the user document
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

  await user.save();

  return resetToken;
};

export const resetPassword = async (
  newPassword: string,
  token: string,
): Promise<IUser> => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new UserErrror('Invalid or expired token');
  }

  user.password = newPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  const updated = await user.save();

  return updated;
};
