const express = require('express');

const mainController = require('../controllers/main');
const authRouter = require('./auth');
const { accessToken } = require('../middleware/access-token')
const notificationsRouter = require('./notifications');

const router = express.Router();

router.get('/', mainController.main);

router.get('/technicians', mainController.getTechnicians);

router.get('/statistics', accessToken, mainController.stats);

router.use('/auth', authRouter);

router.use('/notify', notificationsRouter);

module.exports = router;