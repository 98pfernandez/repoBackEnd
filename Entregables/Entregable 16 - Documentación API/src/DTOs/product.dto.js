class ProductDTO {
  constructor(products) {
    if(Array.isArray(products)){
      this.products = products.map(product => ({
        title: product.title,
        description: product.description,
        code: product.code,
        price: product.price,
        stock: product.stock,
        category: product.category,
        image: product.image,
        owner: product.owner
      }));    
    }else{
      this.title=products.title
      this.description=products.description
      this.code=products.code
      this.price=products.price
      this.stock=products.stock
      this.category=products.category
      this.image=products.image
      this.owner=products.owner
    }
    }
}
export default ProductDTO;