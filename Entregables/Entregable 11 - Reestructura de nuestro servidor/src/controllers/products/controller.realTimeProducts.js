import {arrayProducts} from './controller.products.js'
import  Router from 'express'

const router = Router();

router.get('/', (req, res ) =>{
    res.render('realTimeProducts.handlebars', {arrayProducts});
    })


export {router as realTimeProducts};