import { Server as IoServer, Socket } from 'socket.io';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { CLIENT_URL } from '../config';
import { IUser } from '../database/models/user';
import { authMiddleware } from './middleware/auth';
import { messageHandler } from './handler/messageHandler';
import { onlineStatusHandler } from './handler/onlineStatusHandler';

type HttpServer = Server<typeof IncomingMessage, typeof ServerResponse>;

interface Message {
  message: string;
  chatId: string;
}

export interface ServerToClientEvents {
  message(message: Message): void;
  online(userId: string): void;
}

export interface ClientToServerEvents {
  message: (message: Message) => void;
  online: (data: { isOnline: boolean }) => void;
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
    console.log('user', socket.data?.user);
    console.log('New client connected');

    // handle the message event
    messageHandler(socket);

    // handle the online status event
    onlineStatusHandler(socket);

    // handle the disconnect event
    socket.on('disconnect', () => {
      connections.delete(socket.data?.user?._id);
      console.log('Client disconnected');
    });
  });
}
