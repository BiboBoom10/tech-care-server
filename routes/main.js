const express = require('express');

const mainController = require('../controllers/main');
const authRouter = require('./auth');

const router = express.Router();

router.get('/', mainController.main);

router.use('/auth', authRouter);

module.exports = router;