//Levanta el servidor

const express = require('express');
const routes = require('./routes');
const port = 8080; 

const app=express();
app.use(express.json());
routes(app);

app.listen(port, ()=>{
    console.log("server running at port" + port)
})