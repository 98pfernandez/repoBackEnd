import productModel from './models/products.models.js'

class ProductDao{
    //metodo para buscar en la BD para la coleccion products
    async find(query,queryValue, limit, page, sort){
        try {
            const products = await productModel.paginate({query:queryValue}, { limit, page, sort:{price: sort} })
            return products
        } catch (error) {
            return error
        }
    }

    async insertMany(products) {
        try {
          await productModel.insertMany(products)
          return 'new products were added'
        } catch (error) {
          return error
        }
      }
}

export default ProductDao;