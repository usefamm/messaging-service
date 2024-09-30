import { Request, Response } from 'express';
import messageService from '../services/messageService';

interface AuthenticatedRequest extends Request {
    user?: { username: string }; // Extend the user type with expected fields
}

export const sendMessage = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { recipient, content } = req.body;
    const sender = req.user?.username;

    if (!sender) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }

    try {
        const message = await messageService.sendMessage(sender, recipient, content);
        res.status(201).json({ success: true, message });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getMessages = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const username = req.user?.username;

    if (!username) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }

    try {
        const messages = await messageService.getMessages(username);
        res.status(200).json({ success: true, messages });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
