//Levanta el servidor
import express from 'express';
import routes from './router/index.js';
import handlebars from 'express-handlebars';
import __dirname from './public/utils.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo'
import passport from 'passport';
import {initializePassport}  from './config/passport.js';
import dotenv from 'dotenv';
import dbConnect from '../db/index.js';
import flash from 'connect-flash';

const app = express();


// Configurar el middleware de mensajes flash
app.use(flash());

//Variables de entorno:
dotenv.config({path: '../../.env'})

const dbUser=process.env.DB_USER;
const dbPass=process.env.DB_PASS;
const dbHost=process.env.DB_HOST;
const dbName=process.env.DB_NAME;

//HandleBars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname))


//Session
app.use(cookieParser('PABLO123'))
app.use(session({
  // store: new fileStorage({ path: __dirname + '/sessions', ttl: 100, retries: 0 }),
  store: MongoStore.create({
    mongoUrl:  `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority`,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  secret: 'loqueQuier4',
  resave: false,
  saveUninitialized: false
}))

//passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//morgan
app.use(morgan('dev'));


dbConnect();

//Routes
routes(app);

export default app;
