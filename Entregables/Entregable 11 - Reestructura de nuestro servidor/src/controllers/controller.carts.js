import Router from 'express';
import cartModel from '../models/cart.models.js'
import CartService from '../services/carts.service.js';
import ProductService from '../services/products.service.js';
const cartService = new CartService();
const productService = new ProductService();

const router = Router();

//create cart without products
router.post('/', async (req, res) => {
    try {
        const response = await cartService.createCart()
        res.json({ response })

    } catch (error) {
        res.json(error)
    }
})

router.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const { arrayProducts } = req.body

    try {
        const cart = await cartModel.findOne({ _id: cid })

        arrayProducts.forEach(product => {
            cart.products.push({ product: product })
        });
        await cartModel.updateOne({ _id: cid }, cart)

        res.json({ message: 'the products were added!' })
    } catch (error) {
        res.json({ message: 'the cart wasnt found ' + error })
    }
})

//add product to cart
router.patch('/:cartID', async (req, res) => {
    const { cartID } = req.params
    const { productID } = req.body

    try {
        //get cart
        const cart = await cartService.getCartById(cartID)
        if (cart.error || cart.length==0) {
            return res.status(404).json({ response: "cart not found" });
        }

        //get prodcut
        const product = await productService.getProductByID(productID);
        if (product.error || product.length==0) {
            return res.status(404).json({ response: "product not found" });
        }

        cart.products.push({ product: productID })
        const responseDB = await cartService.updateCart(cartID, cart)

        res.json({ responseDB })
    } catch (error) {
        res.json({ message: 'the cart wasnt found' })
    }
})



//get all carts
router.get('/', async (req, res) => {
    try {
        const responseDB = await cartService.getCarts();
        res.json({ responseDB })
    } catch (error) {
        console.log(error)
    }
})

//get cart by id
router.get('/:cartId', async (req, res) => {
    const { cartId } = req.params;

    try {
        const cartDB = await cartService.getCartById(cartId);
        const cart = cartDB.products;
        res.render('cart.handlebars', { cart })

    } catch (error) {
        res.json(error)
    }
})

router.delete('/', async (req, res) => {
    try {
        const responseDB = await cartService.deleteAllCarts();
        res.json({ responseDB })
    } catch (error) {
        res.json(error)
    }

})

//delete cart by id
router.delete('/:cartID', async (req, res) => {
    const { cartID } = req.params

    try {
        const responseDB = await cartService.deleteCartById(cartID)
        res.json(responseDB)
    } catch (error) {
        res.json(error);
    }

})

router.delete('/:cartID/products/:productID', async (req, res) => {
    const { cartID } = req.params
    const { productID } = req.params

    try {
        const cart = await cartService.getCartById(cartID);
        
        if (cart.error || cart.length==0) {
            return res.status(404).json({ response: "cart not found" });
        }
        const prodIndex = cart.products.findIndex((prod) => prod.product._id == productID);
        
        if (prodIndex > -1) {
            cart.products.splice(prodIndex, 1);
        }else{
            return res.status(404).json({ response: "product not found" });
        }

        await cartService.updateCart(cartID, cart);
        res.status(200).json({ message: 'product deleted from cart w id: ' + cartID })
    } catch (error) {
        res.json(error);
    }

})


export default router;