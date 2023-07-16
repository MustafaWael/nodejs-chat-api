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

export const getChatsHandler = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    // Get all chats of the authenticated user
    const chats = await chatServices.getChats(user._id);

    res.status(200).json(chats);
  } catch (error) {
    console.error('Error getting chats', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getChatHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get a chat by id
    const chat = await chatServices.getChat(id);

    res.status(200).json(chat);
  } catch (error) {
    console.error('Error getting chat', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
