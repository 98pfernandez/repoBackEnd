import Router from 'express';

const router= Router();

router.get('/', (req,res)=>{
res.render('index.handlebars')
})

router.get('/login', (req, res) => {
    res.render('login.handlebars')
    
    
    req.session.user = {
      first_name: 'Pablito'
    }
  })

export {router as viewsController};