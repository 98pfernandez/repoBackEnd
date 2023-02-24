import  Router from 'express'
import ProductManager from './productManager.js'

const router = Router();

const products = [];

//get all products
router.get('/', (req, res ) =>{
//res.json({message: products})
res.render('home.handlebars', {products});
})

//get product with ID
router.get('/:productID', (req, res ) =>{
    let productID = req.params.productID;

   let product = products.find(product=>product.id==productID);

   res.json({message: product===undefined? "product not found":product})

    })

//create product
router.post('/', (req, res ) =>{
    const { title, description,code,price,stock,category} =req.body;

    let id =products.length
    //Create json
    const product={id, title, description,code,price,stock,category};
    ProductManager.addProduct(product);

    products.push(product)
    res.json({message: "the product was added"})
    })

 //update product
 router.put('/:productID', (req,res)=>{
    let productID = req.params.productID;
    const { title, description,code,price,stock,category} =req.body;

    let index =products.findIndex((product => product.id == productID));

    
    //only will update the fields with data.
    if(index!==-1){
        title!==undefined && (products[index].title=title);
        description!==undefined &&(products[index].description=description);
        code!==undefined &&(products[index].code=code);
        price!==undefined &&(products[index].price=price);
        stock!==undefined &&(products[index].stock=stock);
        category!==undefined &&(products[index].category=category);
        
        ProductManager.updateProduct(products[index]);
        res.json({message: "the product was updated"})
    }else{
        res.json({message: "id not found"})
    }


})

 //delete product
 router.delete('/:productID', (req,res)=>{
    let productID = req.params.productID;
    let index =products.findIndex((product => product.id == productID));

    //delete from json
    ProductManager.deleteProduct(productID);

    if(index!==-1){
        products.splice(index,1);
        return res.json({message: "the product was deleted"})
        }
        res.json({message: "id not found"})
 })
 
export {router as products, products as arrayProducts};