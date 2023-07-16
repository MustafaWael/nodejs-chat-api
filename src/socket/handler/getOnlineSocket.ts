import { SocketType, connections } from '../index';

export const getOnlineSocket = (socket: SocketType) => {
  socket.on('getOnlineSocket', ({ userId }, callback) => {
    const isOnline = connections.has(userId);
    callback({ isOnline, userId });
  });
};
