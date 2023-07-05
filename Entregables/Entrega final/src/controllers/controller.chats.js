import Router from 'express';

const router= Router();

router.get('/', (req,res)=>{ 
const isAdmin= req.user.rol=="admin";
res.render('chat.handlebars',{isAdmin})
})

export {router as chats};