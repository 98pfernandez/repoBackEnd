import productModel from "../dao/models/products.models.js";
import dotenv from "dotenv";

//Variables de entorno:
dotenv.config({ path: "../../.env" });
let serverPORT = process.env.SERVER_PORT;

class ProductRepository {
  //metodo para buscar en la BD para la coleccion products
  async find(query, queryData, limit, page, sort) {
    try {
      const products = await productModel.paginate(
        { [query]: queryData },
        { limit, page, sort: { price: sort }, lean: true }
      );

      let urlBase = `http://localhost:${serverPORT}/products/?`;

      products.nextLink = products.hasNextPage
        ? this.getUrlWithParameters(
            query,
            queryData,
            limit,
            page,
            sort,
            urlBase,
            true
          )
        : null;
      products.prevLink = products.hasPrevPage
        ? this.getUrlWithParameters(
            query,
            queryData,
            limit,
            page,
            sort,
            urlBase,
            false
          )
        : null;

      return products;
    } catch (error) {
      return error;
    }
  }

  async findByID(id) {
    try {
      return await productModel.find({ _id: id });
    } catch (error) {
      return { error};
    }
  }

  async createProduct(product) {
    try {
      return await productModel.create(product);
    } catch (error) {
      return { error};
    }
  }

  async insertMany(products) {
    try {
      return await productModel.insertMany(products);
    } catch (error) {
      return error;
    }
  }

  async updateProduct(product) {
    try {
      return await productModel.updateOne
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      return await productModel.deleteOne({ _id: id });
    } catch (error) {
      return error;
    }
  }

  async deleteAllProducts(id) {
    try {
      return await productModel.deleteMany({});
    } catch (error) {
      return error;
    }
  }

  getUrlWithParameters(
    query,
    queryData,
    limit,
    currentPage,
    sort,
    url,
    nextPage
  ) {
    let urlBase = url;

    if (query != null) urlBase += `query=${query}&queryData=${queryData}`;
    if (limit != null) urlBase += `&limit=${limit}`;
    if (sort != null) urlBase += `&sort=${sort}`;

    let page = nextPage ? parseInt(currentPage) + 1 : parseInt(currentPage) - 1;
    if (currentPage != null) urlBase += `&page=${page}`;

    return urlBase;
  }
}

export default ProductRepository;
