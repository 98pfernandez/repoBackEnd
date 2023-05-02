import Router from "express";
import { privateAccess } from "../middlewares/index.js";
import ProductService from "../services/products.service.js";
import loadItems from "../utils/loadLocalFile.js";
import passport from 'passport'
import {getJWTPayLoad} from '../utils/jwt.utils.js'

const productService = new ProductService();
const router = Router();

const products = [];

//get all products with query params
router.get("/", privateAccess, async (req, res) => {
  const { limit, page, sort, query, queryData } = req.query;

  try {
    const responseDB = await productService.getProducts( query, queryData, limit, page, sort);
    let userName = req.user.user.name
    const products = responseDB;

    console.log(req)

    res.render("products.handlebars", { products, userName });
  } catch (error) {
    console.log(error);
  }
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
    const { title, description, code, price, stock, category } = req.body;

    //Create json
    const product = { title, description, code, price, stock, category };
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
router.delete("/:productID", async (req, res) => {
   const {productID} = req.params;

  const response = await productService.deleteProduct(productID)
  res.json({ response });
});

//delete allProducts
router.delete("/", async (req, res) => {
    const response = await productService.deleteAllProducts();
    res.json({ response});
});

export { router as products, products as arrayProducts };
