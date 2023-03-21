import { Router } from 'express';
import UserModel from '../../dao/models/users.models.js'
import {validPassword} from '../../utils/passwordEncryptor.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { email, pass } = req.body

    const user = await UserModel.findOne({ email })

    if (!user) return res.status(400).json({ error: 'El usuario y la contraseña no coinciden' })

    if (!validPassword(user, pass)) return res.status(400).json({ error: 'El usuario y la contraseña no coinciden' })

    req.session.user = {
      name: user.name,
      email: user.email,
      role: user.email=='adminCoder@coder.com'? 'admin':'user'
    }
    
    res.status(201).json({ message: 'Sesión iniciada' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if (error) return res.json({ error })

    res.redirect('/login')
  })
})

export {router as authController};