import { Router } from 'express';
import { postMessage, fetchMessages } from '../controllers/messageController';

const router = Router();

router.post('/', postMessage);
router.get('/', fetchMessages);

export default router;
