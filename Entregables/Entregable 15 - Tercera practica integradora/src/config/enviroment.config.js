import dotenv from 'dotenv';
//Variables de entorno:
dotenv.config({ path: "../../.env" });

const enviroment= {environment: process.env.NODE_ENV || 'development'};
export{enviroment}