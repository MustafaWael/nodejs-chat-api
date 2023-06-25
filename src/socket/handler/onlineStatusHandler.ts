import { SocketType, connections } from '../index';

export const onlineStatusHandler = (socket: SocketType) => {
  const isOnline = connections.has(socket.data?.user?._id.toString());

  socket.broadcast.emit('online', { isOnline });

  socket.on('disconnect', () => {
    socket.broadcast.emit('online', { isOnline: false });
  });
};
