import { Server } from 'socket.io';
import Message from '../models/Message';

const setupSocket = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('User connected');

        socket.on('sendMessage', async (data: { sender: string; content: string }) => {
            const message = new Message({ sender: data.sender, content: data.content });
            await message.save();
            io.emit('newMessage', message);
        });

        socket.on('typing', (username: string) => {
            socket.broadcast.emit('typing', username);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

export default setupSocket;
