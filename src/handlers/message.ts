import { Request, Response } from 'express';
import { messageServices } from '../services';

export const getMessagesHandler = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;

    // Get all messages of a chat
    const messages = await messageServices.getMessages(chatId);

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error getting messages', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMessageHandler = async (req: Request, res: Response) => {
  try {
    const { messageId, chatId } = req.params;

    // Get a message by id
    const message = await messageServices.getMessage(chatId, messageId);

    res.status(200).json(message);
  } catch (error) {
    console.error('Error getting message', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
