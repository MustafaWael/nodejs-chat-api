import { Server as IoServer, Socket } from 'socket.io';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { CLIENT_URL } from '../config';
import { IUser } from '../database/models/user';
import { authMiddleware } from './middleware/auth';
import { messageHandler } from './handler/messageHandler';
import { onlineStatusHandler } from './handler/onlineStatusHandler';
import { getOnlineSocket } from './handler/getOnlineSocket';

type HttpServer = Server<typeof IncomingMessage, typeof ServerResponse>;

interface Message {
  message: string;
  chatId: string;
  sender: { _id: string };
  receiver: { _id: string };
  timeStamp: Date;
  status: 'pending' | 'sent' | 'read';
}

export interface ServerToClientEvents {
  message(message: Message): void;
  online({ userId, isOnline }: { userId: string; isOnline: boolean }): void;
  getOnlineSocket(
    { userId }: { userId: string },
    callback: (data: { isOnline: boolean; userId: string }) => void,
  ): void;
}

export interface ClientToServerEvents {
  message: (message: Message) => void;
  online: (data: { isOnline: boolean; userId: string }) => void;
  getOnlineSocket: (data: { isOnline: boolean; userId: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  user: IUser;
  token: string;
}

export type SocketType = Socket<
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData
>;

export const connections = new Map<string, SocketType>();

export function initIoServer(httpServer: HttpServer) {
  const io = new IoServer<
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: { origin: CLIENT_URL },
  });

  io.use(authMiddleware);

  io.on('connection', (socket) => {
    connections.set(socket.data?.user?._id.toString(), socket);

    // handle the message event
    messageHandler(socket);

    // handle the online status event
    onlineStatusHandler(socket);

    // handle the get online socket event
    getOnlineSocket(socket);

    // handle the disconnect event
    socket.on('disconnect', () => {
      connections.delete(socket.data?.user?._id);
    });
  });
}
