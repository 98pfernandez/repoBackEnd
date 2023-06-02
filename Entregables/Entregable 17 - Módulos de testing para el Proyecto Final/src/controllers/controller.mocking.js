import Router from 'express';
import generateProduct from '../utils/mock.utils.js';

const router= Router();


router.get("/", (req,res)=>{
    const {productQty} = req.query;
try {
    const mockProducts=generateProduct(productQty)
    res.status(200).json({mockProducts})
} catch (error) {
    res.status(418).json(error)
}
})


export { router as mockingController };