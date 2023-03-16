import {products} from '../controllers/products/controller.products.js';
import {realTimeProducts} from '../controllers/products/controller.realTimeProducts.js';
import carts from '../controllers/carts/controller.carts.js';
import {chats} from '../controllers/chats/controller.chats.js';
import {viewsController} from '../controllers/viewsController/controller.viewsController.js';
import { authController } from '../controllers/auth/controller.auth.js';
import { userController } from '../controllers/users/controller.user.js';
import { privateAccess } from '../middlewares/index.js';

const routes = (app) => {
    app.use('/products',privateAccess, products)
    app.use('/carts',privateAccess,carts)
    app.use('/chats',privateAccess,chats)
    app.use('/realTimeProducts',privateAccess,realTimeProducts)
    app.use('/', viewsController)
    app.use('/auth', authController)
    app.use('/users', userController)

}

export default routes;