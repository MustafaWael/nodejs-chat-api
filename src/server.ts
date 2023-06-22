import { createServer } from 'http';
import { initIoServer } from './socket';
import app from './app';

// Http server
const httpServer = createServer(app);

// Initialize the io server
initIoServer(httpServer);

// Start the HTTP server
export const startServer = (port: string | number) => {
  console.log('Starting server...');

  return httpServer.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};
