import Router from "express";
import { privateAccess } from "../middlewares/index.js";
import ProductService from "../services/products.service.js";
import loadItems from "../utils/loadLocalFile.js";
import UserService from "../services/users.service.js";
const userService=new UserService();
import dotenv from 'dotenv';
//Variables de entorno:
dotenv.config({ path: "../../.env" });
import getCurrentURL from "../utils/getCurrentURL.js";

const productService = new ProductService();
const router = Router();

const products = [];

//get all products with query params
router.get("/", privateAccess, async (req, res) => {
  const { limit, page, sort, query, queryData } = req.query;
  try {
    const urlBase=getCurrentURL(req);
    const responseDB = await productService.getProducts( query, queryData, limit, page, sort,urlBase);
    const responseDBUser=await userService.findUserByEmail(req.user.email);

    let userInfo = {
      name:req.user.name,
      rol: responseDBUser.rol=='premium' || responseDBUser.rol=='admin'};

    const products = responseDB;

    const isAdmin=req.user && (req.user.rol=="admin");
    const specialUser=req.user && (req.user.rol=="admin" || req.user.rol=="premium")? true: false;
    res.render('products.handlebars', {userInfo, products, specialUser,isAdmin});
  } catch (error) {
    console.log(error);
  }
});

router.get("/addProduct", privateAccess,(req, res) => {
  let userMail=req.user.email
  res.render("addProduct.handlebars", {userMail} );
});

//get product with ID
router.get("/:productID" ,async (req, res) => {
  const { productID } = req.params;

  try {
    const responseDB = await productService.getProductByID({ _id:productID });
    res.json({ responseDB });
  } catch (error) {
    console.log(error);
  }
});

//Insert many products from a local JSON file.
router.post("/loadLocalFile", async (req, res) => {
  let path = process.cwd() + "/public/assets/Products.json";
  const products = await loadItems(path);
  const response = await productService.insertMany(products);

  res.json({ response });
});

//create product
router.post("/", async (req, res) => {
  try {
    let { title, description, code, price, stock, category, image, owner } = req.body;
    if(!image) image= "";
    if(!owner) owner= "admin";

    //Create json
    const product = { title, description, code, price, stock, category, image, owner };
    const response= await productService.createProduct(product)

    res.json({ response });
  } catch (error) {
    console.log(error);
  }
});

//update product
router.patch("/:productID", async(req, res) => { 
  const {productID} = req.params;
  const product={};
  const {title, description, code, price, stock, category,image } = req.body;
  
  if(title) product.title=title
  if(description) product.description=description
  if(code) product.code=code
  if(price) product.price=price
  if(stock) product.stock=stock
  if(category) product.category=category
  if(image) product.image=image

  try{
    const response = await productService.updateProduct({ _id:productID}, product);
    res.json({response})
  } catch (error) {
    console.log(error);
  }
});

//delete product
router.delete("/", async (req, res) => {
   const {productID} = req.body;
   const responseDB = await productService.getProductByID({ _id:productID });
   const productOwner=
   console.log(responseDB)

   const isPremiumOwner=responseDB._id=="premium"|| responseDB._id=="admin"? true:false;
if (isPremiumOwner) {
  const mail=process.env.MAILER_SERVICE;
  const emailUser=req.user.email;

  await transport.sendMail({
    from: mail,
    to: emailUser,
    subject: 'Product deleted',
    html:`
    <p>The product with id ${productID} was deleted.</p>`, 
    attachments:[]
  })
}
   
  const response = await productService.deleteProduct(productID)
  return res.json({ response });
});

//delete allProducts
router.delete("/", async (req, res) => {
    const response = await productService.deleteAllProducts();
    res.json({ response});
});

export { router as products, products as arrayProducts };
