import Router from 'express';
import { publicAccess } from '../../middlewares/index.js';

const router= Router();

router.get('/', (req,res)=>{
res.render('index.handlebars')
})

router.get('/login',publicAccess ,(req, res) => {
    res.render('login.handlebars')
  })

  router.get('/signup',publicAccess, (req, res) => {
    res.render('signup.handlebars')
  })

export {router as viewsController};