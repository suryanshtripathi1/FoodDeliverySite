const homeController =require('../app/http/controllers/homeController')
const authController =require('../app/http/controllers/authController')
const menuController = require('../app/http/controllers/menuController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')

const auth = require('../app/http/middlewares/auth')
const guest = require('../app/http/middlewares/guest')
const admin = require('../app/http/middlewares/admin')


function initRoutes(app) {
    app.get('/', homeController().index)
    app.post('/', homeController().cont)

    app.get('/menu', menuController().index)
    
    
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postlogin)
    
    app.get('/signup', guest, authController().signup)
    app.post('/signup', authController().postsignup)

    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)

    app.post('/update-cart', cartController().update)

    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)
    app.post('/orders', auth, orderController().store)

    app.get('/admin/orders', admin, adminOrderController().index)

    app.post('/admin/order/status', admin, statusController().update)
    
}

module.exports = initRoutes