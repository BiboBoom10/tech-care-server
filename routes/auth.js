const { Router } = require('express');
const authController = require('../controllers/auth');
const orderController = require('../controllers/order');
const { accessToken } = require('../middleware/access-token')

const authRouter = Router();

authRouter.post('/register', authController.register);

authRouter.post('/login', authController.login);

authRouter.patch('/update-profile', accessToken, authController.updateProfile);

authRouter.get('/profile', accessToken, authController.profile);

authRouter.post('/orders', accessToken, orderController.createOrder);

authRouter.get('/orders', orderController.getAllOrders);

authRouter.get('/orders/:orderId', orderController.getOrderById);

authRouter.put('/orders/:orderId', orderController.updateOrderById);

authRouter.delete('/orders/:orderId', orderController.deleteOrderById);

module.exports = authRouter;