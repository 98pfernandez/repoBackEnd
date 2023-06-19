import Router from "express";
import { privateAccess } from "../middlewares/index.js";
import CartService from "../services/carts.service.js";
import ProductService from "../services/products.service.js";
import PurchaseService from "../services/purchase.service.js";
const purchaseService = new PurchaseService();
const cartService = new CartService();
const productService = new ProductService();

const router = Router();

router.post("/",privateAccess, async (req,res)=>{
const  cartID   = req.user.cart;

//Agregamos el purchase
try {
    //get cart
    const cart = await cartService.getCartById(cartID)
    if (cart.error || cart.length==0) return res.status(404).json({ response: "cart not found" });
    
    let finalAmount=0;
    const cartFinalProducts=[]
    
    for(let i=cart.products.length-1; i>=0; i--){
        const cartQty=cart.products[i].quantity
        const stock=cart.products[i].product.stock
        const productPrice=cart.products[i].product.price
        const productID=cart.products[i].product._id
        
        //Si hay suficiente stock  actualizamos el mismo restandole la cantidad que se compra.
        if(stock>=cartQty){
            cart.products[i].product.stock=stock-cartQty;

            try{
            await productService.updateProduct({ _id:productID}, cart.products[i].product);
            } catch (error) {
                console.log(error);
            }

            finalAmount+=productPrice*cartQty
            cartFinalProducts.push(cart.products[i])
            cart.products.splice(i, 1)
            } 
    }
    await cartService.updateCart(cartID, cart)

    try {
        const customerInfo={
            purchase_datetime: new Date(),
            amount:finalAmount,
            purchaser: req.user.email,
            products: cartFinalProducts
        }

       await purchaseService.createPurchase(customerInfo);
       res.json({ insufficientStock:  cart.products.length>0? true: false})
    } catch (error) {
        console.log(error)
    }


} catch (error) {
    console.log(error)
}
})


export { router as purchaseController };