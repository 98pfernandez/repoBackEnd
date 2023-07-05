import Router from 'express';
import { publicAccess } from '../middlewares/index.js';
import { getJWTPayLoad } from '../utils/jwt.utils.js';

const router= Router();


router.get('/', (req,res)=>{
  let user=getJWTPayLoad(req);
  let condition =!user;
  let isAdmin=user && user.rol=="admin"? true: false;
  res.render('index.handlebars', {condition,isAdmin})
})

router.get('/login',publicAccess ,(req, res) => {
  let user=getJWTPayLoad(req);
  let condition =!user;
  let isAdmin=user && user.rol=="admin"? true: false;
    res.render('login.handlebars', {condition,isAdmin})
  })

  router.get('/signup',publicAccess, (req, res) => {
    //Si hay una cookie con un JWT valido quiere decír que tenemos una "sesion" activa.
  let user=getJWTPayLoad(req);
  let condition =!user;
  let isAdmin=user && user.rol=="admin"? true: false;
    res.render('signup.handlebars', {condition,isAdmin})
  })

export {router as viewsController};