import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

//Variables de entorno:
dotenv.config({ path: "../../.env" });
const jwtSECRET= process.env.JWT_SECRET;

const generateToken = user => {
  const token = jwt.sign({ user, role: 'admin' }, jwtSECRET, {
    expiresIn: '300s',
  });
  return token;
};

export default generateToken;