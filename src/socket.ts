import { Server as IoServer } from "socket.io";
import { IncomingMessage, Server, ServerResponse } from "http";

type HttpServer = Server<typeof IncomingMessage, typeof ServerResponse>;

export function initIoServer(httpServer: HttpServer) {
  const io = new IoServer(httpServer, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  return io;
}
