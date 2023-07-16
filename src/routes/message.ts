import { Router } from 'express';
import { auth } from '../middlewares';
import { getMessagesHandler, getMessageHandler } from '../handlers/message';

const router = Router();

// Create a new message
// router.post('/messages', auth);

// Get all messages of a chat
router.get('/messages/:chatId', auth, getMessagesHandler);

// Get a message by id
router.get('/messages/:chatId/:messageId', auth, getMessageHandler);

// Update a message by id

// Delete a message by id

export default router;
