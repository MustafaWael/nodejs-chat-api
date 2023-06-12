import { Request, Response } from 'express';
import {
  createUser,
  findUserByEmail,
  updateUser,
  removeUser,
  generateToken,
  removeAllTokens,
  removeSpecificToken,
} from '../services/user';

import { removeSensitiveData } from '../utils/user';

export const signupHandler = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const createdUser = await createUser(newUser);
    const token = await generateToken(createdUser);
    res.status(201).json({ user: removeSensitiveData(createdUser), token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = await generateToken(user);

    return res.json({ user: removeSensitiveData(user), token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    await removeSpecificToken(req.user, req.token);
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logoutAllSessionsHandler = async (req: Request, res: Response) => {
  try {
    await removeAllTokens(req.user);
    res.json({ message: 'All sessions logged out' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCurrentUserHandler = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user;
    res.json(removeSensitiveData(currentUser));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const updates = req.body;
    const updatedUser = await updateUser(userId, updates);
    res.json(removeSensitiveData(updatedUser));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const deletedUser = await removeUser(userId);
    res.json(removeSensitiveData(deletedUser));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};