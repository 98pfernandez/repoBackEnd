import { Router } from 'express';
import UserModel from '../../dao/models/users.models.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { email, pass } = req.body

    const user = await UserModel.findOne({ email })

    if (!user) return res.status(400).json({ error: 'El usuario y la contraseña no coinciden' })

    if (user.pass !== pass) return res.status(400).json({ error: 'El usuario y la contraseña no coinciden' })

    req.session.user = {
      first_name: user.first_name,
      email: user.email
    }
    
    res.status(201).json({ message: 'Sesión iniciada' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export {router as authController};