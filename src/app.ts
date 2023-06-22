import express from 'express';
import cors from 'cors';
import { chatRouter, userRouter } from './routes';
import { authError } from './middlewares/errors/authErrors';

// Express App Instence
const app = express();

// App Middlewares
app.use(cors());
app.use(express.json());

// App Routes
app.use([userRouter, authError]);
app.use(chatRouter);

// Export Express App Instence
export default app;
