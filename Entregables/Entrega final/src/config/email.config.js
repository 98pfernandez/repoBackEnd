import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

//Variables de entorno:
dotenv.config({ path: "../../.env" });

const transport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  })

  export {transport};