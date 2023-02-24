import {products} from '../products/controller.products.js';
import {realTimeProducts} from '../products/controller.realTimeProducts.js';
import carts from '../carts/controller.carts.js';

const routes = (app) => {
    app.use('/products', products)
    app.use('/carts', carts)
    app.use('/realTimeProducts', realTimeProducts)
}

export default routes;