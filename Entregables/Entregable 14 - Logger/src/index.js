import app from "./app.js"
import dotenv from 'dotenv'
import socketServer from "./sockets/index.js";
dotenv.config({path: '../../.env'})

/*Archivo para levantar el server HTTP*/
const serverPort=process.env.SERVER_PORT;

 const httpServer= app.listen(serverPort, () => {
  console.log(`Server listening at the port ${serverPort}`);
});

socketServer(httpServer);

export default httpServer;
