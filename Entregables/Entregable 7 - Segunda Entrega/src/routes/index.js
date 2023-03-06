import {products} from '../controllers/products/controller.products.js';
import {realTimeProducts} from '../controllers/products/controller.realTimeProducts.js';
import carts from '../controllers/carts/controller.carts.js';
import {chats} from '../controllers/chats/controller.chats.js';

const routes = (app) => {
    app.use('/products', products)
    app.use('/carts', carts)
    app.use('/chats', chats)
    app.use('/realTimeProducts', realTimeProducts)
}

export default routes;