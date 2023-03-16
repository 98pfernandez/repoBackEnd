import { Router } from 'express';
import UserModel from '../../dao/models/users.models.js'

const router = Router()

router.post('/', async (req, res) => {
    try {
      const { user, email, pass } = req.body
  
      const newUserInfo = {
        user,
        email,
        pass
      }
  
      const newUser = await UserModel.create(newUserInfo)
  
      res.status(201).json({ message: newUser })
    } catch (error) {
      console.log(error)
      if (error.code === 11000) return res.status(400).json({ error: 'El usuario ya existe' })
      res.status(500).json({ error: 'Internal server error' })
    }
  })

  
export {router as userController};