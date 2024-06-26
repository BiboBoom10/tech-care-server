const { Router } = require('express');
const authController = require('../controllers/auth');
const orderController = require('../controllers/order');
const { accessToken } = require('../middleware/access-token')

const authRouter = Router();

authRouter.post('/register', authController.register);

authRouter.post('/login', authController.login);

authRouter.patch('/update-profile', accessToken, authController.updateProfile);

authRouter.patch('/update-order-status', accessToken, orderController.updateOrderStatus);

authRouter.get('/notifications', accessToken, orderController.getNotifications);

authRouter.get('/profile', accessToken, authController.profile);

authRouter.post('/orders', accessToken, orderController.createOrder);

authRouter.get('/orders', accessToken, orderController.getAllOrders);

authRouter.get('/orders/:orderId', orderController.getOrderById);

authRouter.put('/orders/:orderId', orderController.updateOrderById);

authRouter.delete('/orders/:orderId', orderController.deleteOrderById);

authRouter.patch('/rate-order', accessToken, orderController.rateOrder)

module.exports = authRouter;