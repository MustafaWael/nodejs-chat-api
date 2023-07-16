import { Chat } from '../database/models';
import { IChat } from '../database/models/chat';

type Participants = IChat['participants'];

export const createChat = async (participants: Participants) => {
  try {
    // Create a new chat with the specified participants
    const chat = await Chat.create({ participants });
    return chat;
  } catch (error) {
    console.error('Error creating chat', error);
    throw new Error('Error creating chat');
  }
};

export const getChats = async (userId: string) => {
  try {
    // Get all chats of the authenticated user
    const chats = await Chat.find({ participants: userId }).populate(
      'participants',
      'name email',
    );

    return chats;
  } catch (error) {
    console.error('Error getting chats', error);
    throw new Error('Error getting chats');
  }
};

export const getChat = async (id: string) => {
  try {
    // Get a chat by id
    const chat = await Chat.findById(id).populate('participants', 'name email');

    return chat;
  } catch (error) {
    console.error('Error getting chat', error);
    throw new Error('Error getting chat');
  }
};
