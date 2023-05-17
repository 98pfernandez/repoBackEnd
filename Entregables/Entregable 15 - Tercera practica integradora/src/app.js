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
import { errorHandler } from './middlewares/handler.errors.js';
import { addLogger } from './middlewares/logger.js';

const app = express();
//Logger
app.use(addLogger)

//Express
app.use(express.json());

//HandleBars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname))

//errorHandler

//Session
app.use(cookieParser())

//passport
initializePassport();
app.use(passport.initialize());

dbConnect();

//Routes
routes(app);
app.use(errorHandler)

export default app;
