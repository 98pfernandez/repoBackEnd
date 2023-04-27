import ProductDTO from "../DTOs/product.dto.js";
import ProductRepository from "../dao/repository/products.repository.js"
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
    const DTO=  new ProductDTO(products);
    return productRepository.insertMany(DTO.products)
  }

  createProduct(product){
    const productDTO=new ProductDTO(product);

    if (!product.title || !product.description || !product.price) {
        return ({error:'missing parameters'});
      }

    return productRepository.createProduct(productDTO)
  }

  deleteProduct(id){
    if(!id) return ({error:'insert valid ID!'})
    return productRepository.deleteProduct(id);
  }

  deleteAllProducts(){
    return productRepository.deleteAllProducts();
  }

  updateProduct(id, product) {
    const productDTO=new ProductDTO(product);
    return productRepository.updateProduct(id, productDTO);
  }
}

export default ProductService