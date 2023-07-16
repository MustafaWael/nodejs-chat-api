import { Message } from '../database/models';

export const getMessages = async (chatId: string) => {
  try {
    // Get all messages of a chat
    const messages = await Message.find({ chatId }).populate([
      {
        path: 'sender',
        select: 'name, email',
      },
      {
        path: 'receiver',
        select: 'name, email',
      },
    ]);

    return messages;
  } catch (error) {
    console.error('Error getting messages', error);
    throw new Error('Error getting messages');
  }
};

export const getMessage = async (chatId: string, messageId: string) => {
  try {
    // Get a message by id
    const message = await Message.findOne({ _id: messageId, chatId }).populate([
      {
        path: 'sender',
        select: 'name, email',
      },
      {
        path: 'receiver',
        select: 'name, email',
      },
    ]);

    return message;
  } catch (error) {
    console.error('Error getting message', error);
    throw new Error('Error getting message');
  }
};
