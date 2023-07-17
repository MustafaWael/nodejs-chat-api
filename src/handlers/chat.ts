import { Request, Response } from 'express';
import { chatServices } from '../services';
import { ChatError } from '../errors/ChatError';

export const createChatHandler = async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;

    // Check if the participant id length is equal to mongoose ObjectId length
    if (participants.length === 2) {
      const [firstParticipant, secondParticipant] = participants;
      if (
        firstParticipant.toString().length !== 24 ||
        secondParticipant.toString().length !== 24
      ) {
        throw new ChatError('Invalid User ID');
      }
    }

    // Create a new chat with the specified participants
    const chat = await chatServices.createChat(participants);

    res.status(201).json(chat);
  } catch (error) {
    if (error instanceof ChatError) {
      return res.status(400).json({ error: error.message });
    }

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
