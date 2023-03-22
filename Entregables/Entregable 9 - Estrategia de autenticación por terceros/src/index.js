//Levanta el servidor
import express from 'express';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from './public/utils.js';
import { arrayProducts } from './controllers/products/controller.products.js'
import chatModel from './dao/models/chat.models.js'
import session from 'express-session';
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser';
import {initializePassport}  from './config/passport.js';
import passport from 'passport';
import morgan from 'morgan';

const port = 8080;
const app = express();

//Express
app.use(express.json());

//HandleBars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname))

//Mongoose
mongoose.set('strictQuery', false);
app.use(cookieParser('PABLO123'))
app.use(session({
    // store: new fileStorage({ path: __dirname + '/sessions', ttl: 100, retries: 0 }),
        store: MongoStore.create({
      mongoUrl: 'mongodb+srv://pasefelo:pasefelo123@cluster0.ppbw3mf.mongodb.net/sessions?retryWrites=true&w=majority',
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: 'loqueQuier4',
    resave: false,
    saveUninitialized: false
  }))

mongoose.connect('mongodb+srv://pasefelo:pasefelo123@cluster0.ppbw3mf.mongodb.net/ecommerce?retryWrites=true&w=majority', (error) => {
    if (error) {
        console.log('cannot connect to database')
        process.exit();
    }
})

//passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//morgan
app.use(morgan('dev'));

//Routes
routes(app);

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