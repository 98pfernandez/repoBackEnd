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

router.patch('/', async(req,res)=>{
const {users}=req.body;
const responseDB=[];
try {
  for (let i=0; i<users.length;i++){
    responseDB.push(await userService.updateUser(users[i].email, users[i]));
  }

  const updateQty = responseDB.reduce((acumulador, objeto) => {
    return acumulador + objeto.modifiedCount;
  }, 0);

  return res.status(200).json({"modifiedCount":updateQty})
} catch (error) {
 return res.status(409).json({error})
}

})

export {router as configController};