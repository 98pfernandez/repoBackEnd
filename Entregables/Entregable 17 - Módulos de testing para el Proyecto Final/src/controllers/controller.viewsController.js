import Router from 'express';
import { publicAccess } from '../middlewares/index.js';
import { getJWTPayLoad } from '../utils/jwt.utils.js';

const router= Router();


router.get('/', (req,res)=>{
  let condition =!getJWTPayLoad(req);
  res.render('index.handlebars', {condition})
})

router.get('/login',publicAccess ,(req, res) => {
    let condition = !getJWTPayLoad(req);
    res.render('login.handlebars', {condition})
  })

  router.get('/signup',publicAccess, (req, res) => {
    //Si hay una cookie con un JWT valido quiere decír que tenemos una "sesion" activa.
    let condition = !getJWTPayLoad(req);
    res.render('signup.handlebars', {condition})
  })

export {router as viewsController};