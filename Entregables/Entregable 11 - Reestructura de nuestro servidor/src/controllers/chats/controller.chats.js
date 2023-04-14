import Router from 'express';
import socketServer from '../../sockets/index.js';

const router= Router();

router.get('/', (req,res)=>{

    
socketServer();
res.render('chat.handlebars')
})

export {router as chats};