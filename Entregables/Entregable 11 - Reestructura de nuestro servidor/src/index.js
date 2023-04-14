import app from "./app.js"
import dotenv from 'dotenv'
dotenv.config({path: '../../.env'})

/*Archivo para levantar el server HTTP*/
const serverPort=process.env.SERVER_PORT;

const httpServer=app.listen(serverPort, () => {
  console.log(`Server listening at the port ${serverPort}`);
});

export default httpServer;
