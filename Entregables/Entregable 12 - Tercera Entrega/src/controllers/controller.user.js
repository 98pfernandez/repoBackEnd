import  Router  from 'express';
import passport from 'passport';
import { generateToken } from '../utils/jwt.utils.js';

const router = Router()

router.post(
  '/',
  passport.authenticate('register', {session:false, failureRedirect: '/users/failRegister', failureFlash:true  }),
  async (req, res) => {
    try {
      const userToken = req.user;
      const token = generateToken(userToken);
      res.cookie("authToken", token, { httpOnly: true }).status(201).json({ message: "Sesión iniciada" });
    } catch (error) {
      console.log(error);
      if (error.code === 11000)
        return res.status(400).json({ error: 'El usuario ya existe' });
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  })

router.get('/failRegister', async (req, res) => {
  res.json({ error: "login error"});
});


export { router as userController };