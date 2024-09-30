import Message from '../models/Message';
import User from '../models/User'; // Import the User model to check recipient existence

class MessageService {
    async sendMessage(sender: string, recipient: string, content: string) {
        // Check if recipient exists
        const recipientUser = await User.findOne({ username: recipient });
        if (!recipientUser) {
            throw new Error('Recipient does not exist');
        }

        // Create and save the message
        const message = new Message({
            sender,
            recipient,
            content,
            timestamp: new Date(),
        });

        await message.save();
        return message;
    }

    async getMessages(username: string) {
        const messages = await Message.find({
            $or: [{ sender: username }, { recipient: username }],
        }).sort({ timestamp: -1 });
        return messages;
    }
}

export default new MessageService();
