import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
    sender: string; // User's username who sends the message
    recipient: string; // User's username who receives the message
    message: string; // The content of the message
    timestamp: Date; // Optional: when the message was sent
}

const messageSchema = new Schema<IMessage>({
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Message = model<IMessage>('Message', messageSchema);

export default Message;
