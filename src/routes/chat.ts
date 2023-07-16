import { Router } from 'express';
import {
  createChatHandler,
  getChatHandler,
  getChatsHandler,
} from '../handlers/chat';
import { auth } from '../middlewares';

const router = Router();

// Create a new chat
router.post('/chats', auth, createChatHandler);

// Get all chats of the authenticated user
router.get('/chats', auth, getChatsHandler);

// Get a chat by id
router.get('/chats/:id', auth, getChatHandler);

// Update a chat by id

// Delete a chat by id

export default router;
