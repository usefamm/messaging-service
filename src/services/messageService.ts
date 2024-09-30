import Message from '../models/Message';
import Cache from './cache';

export const sendMessage = async (sender: string, content: string) => {
    const message = new Message({ sender, content });
    await message.save();
    await Cache.cacheMessage(message); // Optionally cache the message
    return message;
};

export const getMessages = async () => {
    const cachedMessages = await Cache.getMessages(); // Try to get from cache
    if (cachedMessages) {
        return cachedMessages;
    }
    const messages = await Message.find().sort({ createdAt: -1 }).limit(50); // Fallback to DB
    return messages;
};
