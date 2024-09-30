import { Server } from 'socket.io';
import Message from '../models/Message';

const setupSocket = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('User connected');

        socket.on('message', async (message) => {
            console.log("message", message);
            
            io.emit('message', message);
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
