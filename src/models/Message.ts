import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
    sender: string;
    content: string;
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
    sender: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Message = model<IMessage>('Message', messageSchema);
export default Message;
