import Router from 'express'
import ProductManager from '../../dao/fileSystemManager/productManager.js'
import productModel from '../../dao/models/products.models.js'
import FilesDao from '../../dao/mongoManager/File.dao.js';
import ProductsDao from '../../dao/mongoManager/Products.dao.js'

const productDao=new ProductsDao();
const router = Router();

const products = [];

//get all products with query params
router.get('/', async (req, res) => {

    let limit = req.query.limit!=undefined? req.query.limit : 10;
    let page =  req.query.page!=undefined? req.query.page : 1;
    let sort =  req.query.sort!=undefined? req.query.sort : null;

    let query =  req.query.query!=undefined? req.query.query : null;
    let queryData =  req.query.queryData!=undefined? req.query.queryData : null;

    //error prevent
    if(query==null || queryData==null){
        query=null;
        queryData=null;
    }
    
    const responseDB=await productDao.find(query,queryData, limit,page,sort)
    
    const products= responseDB;
    res.render('products.handlebars', {products})

        // res.json({message: responseDB}) 
    //res.render('home.handlebars', {products});


    /*res.json({message: products})
    try {
       // const productsDB = await productModel.find();
        // res.json({message: productsDB}) 

        res.json({ result: 'ok', payload: productsDB })
    } catch (error) {
         res.status(500).json(error)
    }*/
})


//get product with ID
router.get('/:productID', async(req, res) => {
    let productID = req.params.productID;

   // let product = products.find(product => product.id == productID);
try {
    const productsDB = await productModel.find({_id:productID});
    res.json({ message: productsDB })
} catch (error) {
    res.status(200).json('product not found')
}
})

//Insert many products from a local JSON file.
router.post('/loadLocalFile', async(req,res)=>{
        let path=process.cwd()+'/assets/Products.json';
        const fileDao=new FilesDao(path)
        const products= await fileDao.loadItems()
        const response =await productDao.insertMany(products);

        res.json({ message: response })
} )

//create product
router.post('/',  async (req, res) => {
    
    try {
        const { title, description, code, price, stock, category } = req.body;

    //Create json
    const product = { title, description, code, price, stock, category };
    
    if(!title || !description || !price){
       res.status(400).json('missing parametrs')
    }
    
    ProductManager.addProduct(product);
    products.push(product)

    await productModel.create(product);
    res.json({ message: "the product was added" })
   
    } catch (error) {
        console.log(error)
    }
})

//update product
router.put('/:productID', (req, res) => {
    let productID = req.params.productID;
    const { title, description, code, price, stock, category } = req.body;

    let index = products.findIndex((product => product.id == productID));


    //only will update the fields with data.
    if (index !== -1) {
        title !== undefined && (products[index].title = title);
        description !== undefined && (products[index].description = description);
        code !== undefined && (products[index].code = code);
        price !== undefined && (products[index].price = price);
        stock !== undefined && (products[index].stock = stock);
        category !== undefined && (products[index].category = category);

        ProductManager.updateProduct(products[index]);
        res.json({ message: "the product was updated" })
    } else {
        res.json({ message: "id not found" })
    }


})

//delete product
router.delete('/:productID', async (req, res) => {
    let productID = req.params.productID;
    let index = products.findIndex((product => product.id == productID));


    try {
        const productsDB = await productModel.deleteOne({_id:productID});
        res.json({ message:'the product was deleted' })
    } catch (error) {
        res.status(200).json('product not found')
    }

    //delete from json
    ProductManager.deleteProduct(productID);

    if (index !== -1) {
        products.splice(index, 1);
    }
})

//Siguiente metodo solo configurado paramongoDB
router.delete('/', async (req, res) => {

    try {
        const productsDB = await productModel.deleteMany({});
        res.json({ message:'all products was deleted' })
    } catch (error) {
        res.status(200).json(error)
    }

})

export {router as products, products as arrayProducts};