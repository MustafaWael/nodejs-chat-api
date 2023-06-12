import express from 'express';
import cors from 'cors';
import { userRouter } from './routes';
import { authError } from './middlewares/errors/authErrors';

// Express App Instence
const app = express();

// App Middlewares
app.use(cors());
app.use(express.json());

// App Routes
app.use([userRouter, authError]);

// Export Express App Instence
export default app;
