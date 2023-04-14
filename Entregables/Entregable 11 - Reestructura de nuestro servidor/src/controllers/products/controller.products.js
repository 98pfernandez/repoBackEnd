import Router from "express";
import ProductManager from "../../dao/fileSystemManager/productManager.js";
import productModel from "../../dao/models/products.models.js";
import FilesDao from "../../dao/mongoManager/File.dao.js";
import ProductsDao from "../../dao/mongoManager/Products.dao.js";
import { privateAccess } from "../../middlewares/index.js";
import ProductService from "../../services/products.service.js";

const productService = new ProductService();
const router = Router();

const products = [];

//get all products with query params
router.get("/", privateAccess,async (req, res) => {
  const { limit, page, sort, query, queryData } = req.query;

  try {
    const responseDB = await productService.getProducts( query, queryData, limit, page, sort);
    let userName = req.session.user.name;
    const products = responseDB;
    res.render("products.handlebars", { products, userName });
  } catch (error) {
    console.log(error);
  }
});

//get product with ID
router.get("/:productID", privateAccess,async (req, res) => {
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
  let path = process.cwd() + "/assets/Products.json";
  const fileDao = new FilesDao(path);
  const products = await fileDao.loadItems();
  const response = await productService.insertMany(products);

  res.json({ message: response });
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
router.put("/:productID", async(req, res) => { 
  const {productID} = req.params;
  try {
    const responseDB = await productService.getProductByID({ _id: productID });
   //Si el producto existe podemos modificarlo
    if (!responseDB.error) {
        const {_id, title, description, code, price, stock, category } = req.body;
        const product = {_id, title, description, code, price, stock, category };
        
        
      } 

  } catch (error) {
    console.log(error);
  }

 /*
  const { title, description, code, price, stock, category } = req.body;

  let index = products.findIndex((product) => product.id == productID);

  //only will update the fields with data.
  if (index !== -1) {
    title !== undefined && (products[index].title = title);
    description !== undefined && (products[index].description = description);
    code !== undefined && (products[index].code = code);
    price !== undefined && (products[index].price = price);
    stock !== undefined && (products[index].stock = stock);
    category !== undefined && (products[index].category = category);

    ProductManager.updateProduct(products[index]);
    res.json({ message: "the product was updated" });
  } else {
    res.json({ message: "id not found" });
  }*/
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
