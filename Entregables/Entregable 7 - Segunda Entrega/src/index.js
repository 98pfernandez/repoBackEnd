//Levanta el servidor
import express from 'express';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from './public/utils.js';
import { arrayProducts } from './controllers/products/controller.products.js'
import chatModel from './dao/models/chat.models.js'
import dotenv from 'dotenv';
const app = express();
//Variables de entorno:
dotenv.config({ path: '../../.env' })

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME_ECOMMERCE;

const port = 8080;
//Express
app.use(express.json());

//Routes
routes(app);

//HandleBars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname))

//Socket IO
const httpServer = app.listen(port, () => {
    console.log("server running at port" + port)
})

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

//Mongoose
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority`, (error) => {
    if (error) {
      console.log('cannot connect to database')
      process.exit();
    } 
  })
