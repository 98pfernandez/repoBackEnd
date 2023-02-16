//Levanta el servidor
const express = require('express');
const routes = require('./routes');
const mongoose= require('mongoose')
const handlebars = require('express-handlebars');
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

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://pasefelo:pasefelo123@cluster0.ppbw3mf.mongodb.net/ecommerce?retryWrites=true&w=majority',(error)=>{
    if(error){
        console.log('cannot connect to database')
        process.exit();
    }
})

app.listen(port, ()=>{
    console.log("server running at port" + port)
})