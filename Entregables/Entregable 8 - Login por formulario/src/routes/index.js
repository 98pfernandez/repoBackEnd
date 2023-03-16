import {products} from '../controllers/products/controller.products.js';
import {realTimeProducts} from '../controllers/products/controller.realTimeProducts.js';
import carts from '../controllers/carts/controller.carts.js';
import {chats} from '../controllers/chats/controller.chats.js';
import {viewsController} from '../controllers/viewsController/controller.viewsController.js';
import { authController } from '../controllers/auth/controller.auth.js';
import { userController } from '../controllers/users/controller.user.js';

const routes = (app) => {
    app.use('/products', products)
    app.use('/carts', carts)
    app.use('/chats', chats)
    app.use('/realTimeProducts', realTimeProducts)
    app.use('/', viewsController)
    app.use('/auth', authController)
    app.use('/users', userController)

}

export default routes;