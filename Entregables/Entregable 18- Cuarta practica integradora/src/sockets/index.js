import { Server } from 'socket.io';
import chatModel from '../models/chat.models.js'
import ChatService from '../services/chats.service.js';

const chatService=new ChatService();

//Servidor socket

const socketServer= (httpServer) => {

const io = new Server(httpServer);

io.on('connection', (socket) => {
    req.logger.info("Usuario conectado!")

    socket.on('refresh', () => {
        io.emit('showAllProducts', arrayProducts);
    })
    socket.on('addMessageDB', async (message) => {

        try {
            await chatService.createMessage(message);
            io.emit('showNewMessageAllUserConnected', message);
        } catch (error) {
            alert("database error")
        }

    })
    socket.on('getMessageLogs', async () => {
        const chatLogsDB = await chatService.getMessageHistory();
        socket.emit('showMessagesLog', chatLogsDB);
    })
}
)
}

export default socketServer;