import Router from 'express';
import CartManager from '../dao/cartManager.js'
import cartModel from '../dao/models/cart.models.js'

const router = Router();

const carts = [];

//get all carts
router.post('/', async(req, res) => {


    try {
        const { products } = req.body;

        if (!products) {
            res.status(400).json('missing parametrs')
        }

       //Create json
       const cart = new CartManager(products);
       CartManager.addProduct(cart);

       carts.push(cart)

        await cartModel.create(cart);
        res.json({ message: "the cart was added" })

    } catch (error) {
        console.log(error)
    }
})

//get all carts
router.get('/', async (req, res) => {

    try {
        const cartDB = await cartModel.find();

        // res.json({message: productsDB}) 
        res.json({ result: 'ok', payload: cartDB })
    } catch (error) {
        console.log('cannot get carts from mongoose ' + error)
    }
})

//get cart by id
router.get('/:cid', async (req, res) => {
    let idCart = req.params.cid;

    try {
        const cartDB = await cartModel.find({_id:idCart});
        res.json({ message: cartDB })
    } catch (error) {
        res.status(200).json('cart not found')
    }
})

export default router;