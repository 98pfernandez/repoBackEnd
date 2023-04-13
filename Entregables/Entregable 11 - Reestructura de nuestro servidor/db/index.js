import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Variables de entorno:
dotenv.config({path: '../../.env'})

const dbUser=process.env.DB_USER;
const dbPass=process.env.DB_PASS;
const dbHost=process.env.DB_HOST;
const dbName=process.env.DB_NAME;
const dbConnect = () => {

  mongoose.set('strictQuery', false);

  mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority`, (error) => {
    if (error) {
      console.log('cannot connect to database')
      process.exit();
    }else{
      console.log("db connected")
    }
  })

}

export default dbConnect;
