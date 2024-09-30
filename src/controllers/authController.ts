import { Request, Response } from 'express';
import * as AuthService from '../services/authService';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        await AuthService.registerUser(username, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An error occurred' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const result = await AuthService.loginUser(username, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ error: error instanceof Error ? error.message : 'An error occurred' });
    }
};
