import { privateAccess } from '../middlewares/index.js';
import {chats} from '../controllers/controller.chats.js';
import carts from '../controllers/controller.carts.js';
import {products} from '../controllers/controller.products.js';
import {realTimeProducts} from '../controllers/controller.realTimeProducts.js';
import { authController } from '../controllers/controller.auth.js';
import {viewsController} from '../controllers/controller.viewsController.js';
import { userController } from '../controllers/controller.user.js';
import {purchaseController} from '../controllers/controller.purchase.js';
import { mockingController } from '../controllers/controller.mocking.js';
import { configController } from '../controllers/controller.config.js';
import { loggerController } from '../controllers/controller.loggerTest.js';

const routes = (app) => {
    app.use('/products', products)
    app.use('/carts',carts)
    app.use('/chats',privateAccess,chats)
    app.use('/realTimeProducts',privateAccess,realTimeProducts)
    app.use('/', viewsController)
    app.use('/auth', authController)
    app.use('/users', userController)
    app.use('/purchase', purchaseController)
    app.use('/mockingproducts', mockingController)
    app.use('/config', configController)
    app.use('/loggertest', loggerController)
    
    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not Found' })
      })
}

export default routes;