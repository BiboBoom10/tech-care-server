const express = require('express');

const mainController = require('../controllers/main');
const authRouter = require('./auth');
const notificationsRouter = require('./notifications');

const router = express.Router();

router.get('/', mainController.main);

router.use('/auth', authRouter);

router.use('/notify', notificationsRouter);

module.exports = router;