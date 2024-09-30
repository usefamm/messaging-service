import { Request, Response } from 'express';
import * as MessageService from '../services/messageService';

export const postMessage = async (req: Request, res: Response) => {
    try {
        const { sender, content } = req.body;
        const message = await MessageService.sendMessage(sender, content);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An error occurred' });
    }
};

export const fetchMessages = async (req: Request, res: Response) => {
    try {
        const messages = await MessageService.getMessages();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An error occurred' });
    }
};
