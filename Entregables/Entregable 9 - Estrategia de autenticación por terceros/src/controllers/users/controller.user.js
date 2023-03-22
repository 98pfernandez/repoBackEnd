import { Router } from 'express';
import passport from 'passport';
import UserModel from '../../dao/models/users.models.js'
import { hashPassword } from '../../utils/passwordEncryptor.js';

const router = Router()

/*
router.post('/',
  passport.authenticate('register', { failureRedirect: '/failRegister' }),
  async (req, res) => {
    try {
      const { name, email, pass } = req.body

      const newUserInfo = {
        name,
        email,
        pass: hashPassword(pass)
      }

      const newUser = await UserModel.create(newUserInfo)

      res.status(201).json({ message: newUser })
    } catch (error) {
      console.log(error)
      if (error.code === 11000) return res.status(400).json({ error: 'El usuario ya existe' })
      res.status(500).json({ error: 'Internal server error' })
    }
  })
*/

router.post(
  '/',
  passport.authenticate('register', { failureRedirect: '/failRegister' }),
  async (req, res) => {
    try {
      res.json({ message: 'Usuario registrado' });
    } catch (error) {
      console.log(error);
      if (error.code === 11000)
        return res.status(400).json({ error: 'El usuario ya existe' });
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  })

router.get('/failRegister', async (req, res) => {
  res.json({ error: 'Fallo el registro' });
});


export { router as userController };