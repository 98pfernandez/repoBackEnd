const { Router } = require ('express')
const CartManager= require ('./cartManager.js')

const router = Router();

const carts = [];

//get all carts
router.post('/', (req, res ) =>{
    const { products} =req.body;

    //Create json
    const cart=new CartManager(products);
    CartManager.addProduct(cart);

    carts.push(cart)

    res.json({message: "the cart was added"})
    })

    //get all carts
    router.get('/', (req,res)=>{
        res.json({message: carts})
    })

    //get cart by id
    router.get('/:cid', (req,res)=>{
        let idCart=req.params.cid;

        let cart = carts.find(cart=>cart.id==idCart);

        res.json({message: cart===undefined? "cart not found":cart})
    })

module.exports = router;