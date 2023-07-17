import { Chat, User } from '../database/models';
import { IChat } from '../database/models/chat';
import { ChatError } from '../errors/ChatError';

type Participants = IChat['participants'];

export const createChat = async (participants: Participants) => {
  // Check if the participants are a valid users
  const userCount = await User.countDocuments({ _id: { $in: participants } });
  if (userCount !== participants.length) {
    throw new ChatError('Invalid User ID');
  }

  // Create a new chat with the specified participants
  const chat = await Chat.create({ participants });

  if (!chat) {
    throw new ChatError('No User Associated with this ID');
  }
  return chat;
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
