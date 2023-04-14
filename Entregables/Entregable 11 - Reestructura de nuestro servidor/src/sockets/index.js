import httpServer from "../index.js";
import { Server } from 'socket.io';
import chatModel from '../models/chat.models.js'

//Servidor socket

const socketServer= () => {

const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log("Usuario conectado!")

    socket.on('refresh', () => {
        io.emit('showAllProducts', arrayProducts);
    })
    socket.on('addMessageDB', async (message) => {

        try {
            await chatModel.create(message);
            io.emit('showNewMessageAllUserConnected', message);
        } catch (error) {
            alert("database error")
        }

    })
    socket.on('getMessageLogs', async () => {
        const chatLogsDB = await chatModel.find();
        socket.emit('showMessagesLog', chatLogsDB);
    })
}
)
}

export default socketServer;