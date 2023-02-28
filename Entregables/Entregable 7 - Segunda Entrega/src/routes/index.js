import {products} from '../products/controller.products.js';
import {realTimeProducts} from '../products/controller.realTimeProducts.js';
import carts from '../carts/controller.carts.js';
import {chats} from '../chats/controller.chats.js';

const routes = (app) => {
    app.use('/products', products)
    app.use('/carts', carts)
    app.use('/chats', chats)
    app.use('/realTimeProducts', realTimeProducts)
}

export default routes;