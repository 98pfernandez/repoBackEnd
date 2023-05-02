//Levanta el servidor
import express from 'express';
import routes from './router/index.js';
import handlebars from 'express-handlebars';
import __dirname from './public/utils.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import {initializePassport}  from './config/passport.js';
import dbConnect from '../db/index.js';
import flash from 'connect-flash';

const app = express();
//Express
app.use(express.json());


// Configurar el middleware de mensajes flash
app.use(flash());

//HandleBars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname))


//Session
app.use(cookieParser('PABLO123'))

//passport
initializePassport();
app.use(passport.initialize());

//morgan
app.use(morgan('dev'));

dbConnect();

//Routes
routes(app);

export default app;
