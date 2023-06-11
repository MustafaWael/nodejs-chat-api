import express from 'express';
import cors from 'cors';

console.log('Hello World');

// Express App Instence
const app = express();

// App Middlewares
app.use(cors());
app.use(express.json());

// Export Express App Instence
export default app;
