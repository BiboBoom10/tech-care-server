// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notifications');

router.post('/notifications', notificationController.createNotification);

router.get('/notifications/:userId', notificationController.getNotificationsForUser);

router.put('/notifications/:notificationId/mark-as-read', notificationController.markNotificationAsRead);

router.delete('/notifications/:notificationId', notificationController.deleteNotification);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const notificationController = require('../controllers/notifications');

// router.post('/acceptOrder', async (req, res) => {
//   try {
//     await notificationController.createNotification(userId, orderId, 'accept');

//     res.status(200).json({ message: 'Order accepted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/rejectOrder', async (req, res) => {
//   try {

//     await notificationController.createNotification(userId, orderId, 'reject', req.body.rejectionReason);

//     res.status(200).json({ message: 'Order rejected successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
