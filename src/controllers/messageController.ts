import { Request, Response } from 'express';
import  Message from '../models/Message';
import messageService from '../services/messageService';
import { io } from '../index'; // Import io instance

interface AuthenticatedRequest extends Request {
    user?: { username: string };
}

export const sendMessage = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const sender = req.user?.username; // Get the sender from the authenticated user
  const { recipient, message } = req.body; // Get recipient and message from the request body

  if (!sender) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  // Validate the message
  if (!message) {
    res.status(400).json({ success: false, message: 'Message content is required.' });
    return;
  }

  try {
    // Call the message service to send the message
    const newMessage = await messageService.sendMessage(sender, recipient, message);
    
    // Emit the new message to the recipient using Socket.io
    io.to(recipient).emit('newMessage', newMessage);

    res.status(201).json({ success: true, message: newMessage });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get messages between sender and recipient
export const getMessages = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const sender = req.user?.username; // Get the authenticated user as sender
  const { recipient } = req.params; // Get recipient from route parameters

  if (!sender) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  try {
    // Call the message service to retrieve messages
    const messages = await messageService.getMessages(sender);
    if (messages.length === 0) {
      res.status(404).json({ success: false, message: 'No messages found' });
      return;
    }

    res.status(200).json({ success: true, messages });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
