import productModel from './models/products.models.js'

class ProductDao {
  //metodo para buscar en la BD para la coleccion products
  async find(query, queryData, limit, page, sort) {
    try {
      const products = await productModel.paginate({ [query]: queryData }, { limit, page, sort: { price: sort }, lean:true })

      let urlBase = 'http://localhost:8080/products/?'



      products.nextLink = products.hasNextPage == true ? this.getUrlWithParameters(query, queryData, limit, page, sort, urlBase, true) : null;
      products.prevLink = products.hasPrevPage == true ? this.getUrlWithParameters(query, queryData, limit, page, sort, urlBase, false) : null;

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

  getUrlWithParameters(query, queryData, limit, currentPage, sort, url, nextPage) {
    let urlBase = url;

    if (query != null) urlBase += `query=${query}&queryData=${queryData}`
    if (limit != null) urlBase += `&limit=${limit}`
    if (sort != null) urlBase += `&sort=${sort}`

    let page=nextPage ? parseInt(currentPage) + 1 : parseInt(currentPage)  - 1;
    if (currentPage != null) urlBase += `&page=${page}`


    return urlBase
  }
}

export default ProductDao;