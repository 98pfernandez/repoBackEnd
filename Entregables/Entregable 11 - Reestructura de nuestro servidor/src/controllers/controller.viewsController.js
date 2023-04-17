import Router from 'express';
import { publicAccess } from '../middlewares/index.js';

const router= Router();


router.get('/', (req,res)=>{
  let condition = !req.session.user;
res.render('index.handlebars', {condition})
})

router.get('/login',publicAccess ,(req, res) => {
  let condition = !req.session.user;
    res.render('login.handlebars', {condition})
  })

  router.get('/signup',publicAccess, (req, res) => {
    let condition = !req.session.user;
    res.render('signup.handlebars', {condition})
  })

export {router as viewsController};