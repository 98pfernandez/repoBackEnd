import Router from 'express';
import { adminAccess } from '../middlewares/index.js';
import UserService from "../services/users.service.js";
const userService=new UserService();

const router= Router();

router.get('/',adminAccess, async (req,res)=>{
  const isAdmin= req.user.rol=="admin";
  try {
    
  const users=await userService.getUsers();
  res.render('config.handlebars', {users,isAdmin})
  } catch (error) {
    res.status(409).json([error])
  }
})

export {router as configController};