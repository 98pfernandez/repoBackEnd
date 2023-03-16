import Router from 'express';

const router= Router();

router.get('/', (req,res)=>{
res.render('index.handlebars')
})

router.get('/login', (req, res) => {
    res.render('login.handlebars')
  })

  router.get('/signup', (req, res) => {
    res.render('signup.handlebars')
  })

export {router as viewsController};