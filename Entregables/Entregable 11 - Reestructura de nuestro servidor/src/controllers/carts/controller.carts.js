import Router from 'express';
import cartModel from '../../models/cart.models.js'

const router = Router();

//create cart without products
router.post('/', async(req, res) => {


    try {
        await cartModel.create({});
        res.json({ message: "the cart was added" })

    } catch (error) {
        console.log(error)
    }
})

router.put('/:cid', async (req,res)=>{
    const { cid } = req.params
    const { arrayProducts } = req.body

    try{
        const cart = await cartModel.findOne({ _id: cid})

        arrayProducts.forEach(product => {
            cart.products.push({ product: product })
        });
        await cartModel.updateOne({ _id: cid }, cart)

        res.json({message:'the products were added!'})
    }catch(error){
        res.json({message:'the cart wasnt found '+ error})
    }

   
})

router.patch('/:cartID', async (req,res)=>{
    const { cartID } = req.params
    const { productID } = req.body

    try{
        const cart = await cartModel.findOne({ _id: cartID})
        cart.products.push({ product: productID })
        await cartModel.updateOne({ _id: cartID }, cart)

        res.json({message:'OK!'})
    }catch(error){
        res.json({message:'the cart wasnt found'})
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
        const cartDB = await cartModel.findOne({ _id: idCart}).lean();
        const cart= cartDB.products;
        res.render('cart.handlebars', {cart})
        
    } catch (error) {
        res.status(200).json('cart not found')
    }
})

router.delete('/', async (req, res) => {

    try {
        const productsDB = await cartModel.deleteMany({});
        res.json({ message:'all carts was deleted' })
    } catch (error) {
        res.status(200).json(error)
    }

})

router.delete('/:cartID', async (req, res) => {
    const { cartID } = req.params

    try {
        const cart = await cartModel.findOne({ _id: cartID});
        //clear array
       cart.products=[]

     await cartModel.updateOne({ _id: cartID }, cart)

        res.json({ message:'all products were deleted from the cart w id '+ cartID})
    } catch (error) {
        res.json({message:error});
    }

})

router.delete('/:cartID/products/:productID', async (req, res) => {
    const { cartID } = req.params
    const { productID } = req.params

    try {
        const cart = await cartModel.findOne({ _id: cartID});
        const prodIndex = cart.products.findIndex((prod) => prod.product == productID);

        if (prodIndex > -1) {
            cart.products.splice(prodIndex, 1);
          }
     await cartModel.updateOne({ _id: cartID }, cart)

        res.json({ message:'product deleted from cart w id: '+ cartID })
    } catch (error) {
//res.status(200).json(error)
        res.json({message:error});
    }

})


export default router;