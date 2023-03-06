import {arrayProducts} from './controller.products.js'
import  Router from 'express'

const router = Router();

router.get('/', (req, res ) =>{
    //res.json({message: products})
    res.render('realTimeProducts.handlebars', {arrayProducts});
    })


export {router as realTimeProducts};