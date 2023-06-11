import { createServer } from 'http';
import { initIoServer } from './socket';
import app from './app';

// Http server
const httpServer = createServer(app);

// Initialize the io server
const io = initIoServer(httpServer);

// Start the server
export const startServer = (port: string | number) => {
  return httpServer.listen(port, () => {
    // 5173 is the port number
    console.log('Starting server...');
    console.log(`App listening on port ${port}`);
  });
};
