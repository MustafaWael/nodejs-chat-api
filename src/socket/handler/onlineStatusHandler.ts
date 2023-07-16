import { SocketType, connections } from '../index';

export const onlineStatusHandler = (socket: SocketType) => {
  const isOnline = connections.has(socket.data?.user?._id.toString());

  socket.broadcast.emit('online', { isOnline, userId: socket.data?.user?._id });

  socket.on('disconnect', () => {
    // send the id of the user that disconnected and check if he is online or not in the client side
    socket.broadcast.emit('online', {
      isOnline: false,
      userId: socket.data?.user?._id,
    });
  });
};
