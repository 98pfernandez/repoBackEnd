import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import cookieExtractor from './cookieExtractor.js';

//Variables de entorno:
dotenv.config({ path: "../../.env" });
const jwtSECRET = process.env.JWT_SECRET;

const generateToken = user => {
  const token = jwt.sign({ user, role: 'admin' }, jwtSECRET, {
    expiresIn: '30d',
  });
  return token;
};

const  getJWTPayLoad = (req) => {
  try {
    const token =cookieExtractor(req)
    if (!token) return null
    const decoded = jwt.verify(token, jwtSECRET)

    const payload = decoded.user
    return payload

  } catch (error) {
    console.error('Error al desencriptar el JWT:', error);
  }
}

export {getJWTPayLoad,generateToken};