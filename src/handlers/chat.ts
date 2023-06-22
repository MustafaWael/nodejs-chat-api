import { Request, Response } from 'express';
import { chatServices } from '../services';

export const createChatHandler = async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;

    // Create a new chat with the specified participants
    const chat = await chatServices.createChat(participants);

    res.status(201).json(chat);
  } catch (error) {
    console.error('Error creating chat', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
