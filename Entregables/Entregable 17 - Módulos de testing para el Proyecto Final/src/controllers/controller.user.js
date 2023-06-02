import  Router  from 'express';
import passport from 'passport';
import { generateToken } from '../utils/jwt.utils.js';
import { privateAccess } from '../middlewares/index.js';
import UserService from "../services/users.service.js";
import  {transport}  from "../config/email.config.js";
const userService=new UserService();
const router = Router();

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

router.get('/premium/:userEmail' , privateAccess, async (req, res) => {
  const {userEmail} = req.params;

    const responseDBCreate=await userService.findUserByEmail(userEmail)
    if (!responseDBCreate) return res.status(400).json({error:true, info:'user not found'});
      
    const userInfo={
      rol: responseDBCreate.rol =='premium'? 'user' : 'premium'
    }

    const responseDBUpdate=await userService.updateUser(userEmail, userInfo);
    if (responseDBUpdate.modifiedCount==0) return res.status(400).json({error:true, info:'update error'});

    
    res.status(200).json({info:`the role of user ${userEmail} was changed from ${responseDBCreate.rol} to ${userInfo.rol}`});
});

export { router as userController };