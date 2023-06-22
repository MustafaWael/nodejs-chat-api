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
