import app from "./app.js"
import dbConnect from "../db/index.js";

/*Archivo para levantar el server HTTP*/
const serverPort=8080;


const httpServer=app.listen(serverPort, () => {
  console.log(`Server listening at the port ${serverPort}`);
});

export default httpServer;
