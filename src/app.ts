import express from 'express';
import cors from 'cors';
import { chatRouter, messageRouter, userRouter } from './routes';
import { authError } from './middlewares/errors/authErrors';

// Express App Instence
const app = express();

// App Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// App Routes
app.use([userRouter, authError]);
app.use(chatRouter);
app.use(messageRouter);

// Export Express App Instence
export default app;
