//Levanta el servidor
import express from 'express';
import routes from './router/index.js';
import handlebars from 'express-handlebars';
import {__dirname} from './public/utils.js';
import {__dirnameROOT} from './public/utils.js';
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
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
//Helper

const hbs=handlebars.create({
  helpers:{
    equals: function(a, b){
      if (a === b) {
          return true;
        } 
          return false;
}
  }
});

app.engine('handlebars', hbs.engine);

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

//Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentación de Api Rest',
      description:
        'Se lsitaran los metodos y schemas necesarios para trabajar con esta API',
    },
  },

  apis: [`${__dirnameROOT}/docs/**/*.yaml`],
}
console.log(__dirnameROOT);
const specs = swaggerJsdoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

//Routes
routes(app);
app.use(errorHandler)

export default app;
