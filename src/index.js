//Levanta el servidor
const express = require('express');
const routes = require('./routes');
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

app.listen(port, ()=>{
    console.log("server running at port" + port)
})