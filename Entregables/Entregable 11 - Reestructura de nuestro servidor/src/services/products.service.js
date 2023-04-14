import ProductRepository from "../repository/products.repository.js"
const productRepository=new ProductRepository();

class ProductService {
 getProducts(query,queryData, limit,page,sort) {
    //Seteamos la paginación 
    limit = limit || 10;
    page =  page || 1;
    sort =  sort || null;
    query =  query || null;
    queryData =queryData || null;


    return productRepository.find(query,queryData, limit,page,sort)
  }

  getProductByID(id){
    return productRepository.findByID(id)
  }

  insertMany(products){
    return productRepository.insertMany(products)
  }

  createProduct(product){
    if (!product.title || !product.description || !product.price) {
        return ({error:'missing parameters'});
      }

    return productRepository.createProduct(product)
  }

  deleteProduct(id){
    if(!id) return ({error:'insert valid ID!'})
    return productRepository.deleteProduct(id);
  }

  deleteAllProducts(){
    return productRepository.deleteAllProducts();
  }

  updateProduct(){
    return productRepository.updateProduct();
  }
}

export default ProductService