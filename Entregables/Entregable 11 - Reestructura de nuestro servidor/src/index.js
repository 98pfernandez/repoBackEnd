import express from "express";
import dotenv from "dotenv";

/*Archivo para levantar el server HTTP*/

dotenv.config({ path: `../../.env` });
const app = express();
const serverPort = process.env.PORT;

app.listen(serverPort, () => {
  console.log(`Server listening at the port ${serverPort}`);
});
