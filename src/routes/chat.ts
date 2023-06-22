import { Router } from 'express';
import { createChatHandler } from '../handlers/chat';
import { auth } from '../middlewares';

const router = Router();

// Create a new chat
router.post('/chats', auth, createChatHandler);

export default router;
