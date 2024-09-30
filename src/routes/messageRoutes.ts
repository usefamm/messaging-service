import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/messageController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Apply the authenticate middleware to protect these routes
router.post('/', authenticate, sendMessage);
router.get('/', authenticate, getMessages);

export default router;
