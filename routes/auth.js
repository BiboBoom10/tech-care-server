const { Router } = require('express');
const authController = require('../controllers/auth');
const orderController = require('../controllers/order');

const authRouter = Router();

authRouter.post('/register', authController.register);

authRouter.post('/login', authController.login);

authRouter.post('/orders', orderController.createOrder);

authRouter.get('/orders', orderController.getAllOrders);

authRouter.get('/orders/:orderId', orderController.getOrderById);

authRouter.put('/orders/:orderId', orderController.updateOrderById);

authRouter.delete('/orders/:orderId', orderController.deleteOrderById);

module.exports = authRouter;