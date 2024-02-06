const { Router } = require('express');
const authController = require('../controllers/auth');
const { accessToken } = require('../middleware/access-token');

const authRouter = Router();

authRouter.post('/register', accessToken, authController.register);

authRouter.post('/login', authController.login);

module.exports = authRouter;