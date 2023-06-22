import { SocketType, connections } from '../index';
import { Chat } from '../../database/models';

export const messageHandler = (socket: SocketType) => {
  // handle the message event
  socket.on('message', async (data) => {
    try {
      const { message, chatId } = data;

      const chat = await Chat.findOne({
        _id: chatId,
        participants: { $in: socket.data?.user?._id },
      });

      if (!chat) {
        throw new Error('Chat not found');
      }

      // we want to send the message to the other participant in the chat.
      const otherParticipantId = chat.participants.find((participant) => {
        return participant.toString() !== socket.data?.user?._id.toString();
      });

      // if the other participant is not found, throw an error
      if (!otherParticipantId) {
        throw new Error('Other participant not found');
      }

      // transform the other participant id to a string
      const otherParticipantIdString = otherParticipantId.toString();

      // get the socket of the other participant from the connections map
      const otherParticipantSocket = connections.get(otherParticipantIdString);

      // if the other participant is not connected, throw an error
      if (!otherParticipantSocket) {
        throw new Error('Other participant not connected');
      }

      // send the message to the other participant
      otherParticipantSocket.emit('message', { message, chatId });
    } catch (err) {
      console.log(err);
    }
  });
};
