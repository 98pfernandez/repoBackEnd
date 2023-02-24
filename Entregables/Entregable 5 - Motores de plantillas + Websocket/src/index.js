//Levanta el servidor
import express from 'express';
import routes from './routes/index.js';
import handlebars from 'express-handlebars';
import {Server}  from 'socket.io';
import __dirname from './public/js/utils.js';
import {arrayProducts} from './products/controller.products.js'
const port = 8080; 

const app=express();

//allow json express
app.use(express.json());

//router
routes(app);

//engine handlebars
app.engine('handlebars', handlebars.engine());

//views
app.set('views', __dirname+'/views')
//set engine
app.set('view engine','handlebars');

//static files
app.use(express.static(__dirname))

const httpServer=app.listen(port, ()=>{
    console.log("server running at port" + port)
})

const io =new Server(httpServer);

io.on('connection', (socket)=>{
console.log("Usuario conectado!")

socket.on('refresh', ()=>{
    io.emit('showAllProducts', arrayProducts);
})
})
