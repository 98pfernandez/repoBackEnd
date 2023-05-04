import Router from "express";
import { privateAccess } from "../middlewares/index.js";
import CartService from "../services/carts.service.js";
const cartService = new CartService();

const router = Router();

router.post("/",privateAccess, async (req,res)=>{
const  cartID   = req.user.cart;

try {
    //get cart
    const cart = await cartService.getCartById(cartID)
    if (cart.error || cart.length==0) return res.status(404).json({ response: "cart not found" });

    console.log(cart.products)

    for(let i=cart.products.length-1; i>=0; i--){
         if(cart.products[i].quantity>=cart.products.product[i].stock) cart.product.splice(i, 1)
    }

    console.log(cart)

    const responseDB = await cartService.updateCart(cartID, cart)
    res.json({ responseDB })

} catch (error) {
    res.json({ message: 'the cart wasnt found' })
}
})


export { router as purchaseController };