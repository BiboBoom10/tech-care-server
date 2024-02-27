// controllers/notificationController.js
const Notification = require('../models/notification');

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { userId, orderId, messageType, rejectionReason } = req.body;
    
    const notification = new Notification({
      userId,
      orderId,
      messageType,
      rejectionReason: messageType === 'reject' ? rejectionReason : undefined,
    });

    const savedNotification = await notification.save();

    res.status(201).json(savedNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all notifications for a user
const getNotificationsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mark a notification as read
const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const deletedNotification = await Notification.findByIdAndDelete(notificationId);

    if (!deletedNotification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createNotification,
  getNotificationsForUser,
  markNotificationAsRead,
  deleteNotification,
};


// const Notification = require('../models/notification');

// const createNotification = async (userId, orderId, messageType, rejectionReason = null) => {
//   try {
//     const notification = new Notification({
//       userId,
//       orderId,
//       messageType,
//       rejectionReason,
//     });

//     await notification.save();
//     return notification;
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = {
//   createNotification,
// };




// // const axios = require('axios');

// // const userTokens = {
// //   'user-1': 'user-device-token-1',
// //   'user-2': 'user-device-token-2',
// // };

// // function getUserDeviceToken(userId) {
// //   return userTokens[userId];
// // }

// // async function sendInAppNotification(deviceToken, notificationType, payload) {
// //   const inAppNotificationEndpoint = 'https://your-app-endpoint.com/in-app-notifications';

// //   try {
// //     await axios.post(inAppNotificationEndpoint, {
// //       deviceToken,
// //       notificationType,
// //       payload,
// //     });

// //     console.log(`In-app notification sent to device with token ${deviceToken}`);
// //   } catch (error) {
// //     console.error(`Error sending in-app notification to device with token ${deviceToken}:`, error);
// //     throw error;
// //   }
// // }

// // exports.acceptOrderNotification = async (req, res) => {
// //   try {
// //     const { userId, orderId } = req.body;
// //     const userDeviceToken = getUserDeviceToken(userId);
// //     await sendInAppNotification(userDeviceToken, 'accept_order', { orderId });
// //     res.status(200).send('Accept order in-app notification sent successfully');
// //   } catch (error) {
// //     console.error('Error sending accept order in-app notification:', error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // };

// // exports.rejectOrderNotification = async (req, res) => {
// //   try {
// //     const { userId, orderId, rejectionReason } = req.body;
// //     const userDeviceToken = getUserDeviceToken(userId);
// //     await sendInAppNotification(userDeviceToken, 'reject_order', { orderId, rejectionReason });
// //     res.status(200).send('Reject order in-app notification sent successfully');
// //   } catch (error) {
// //     console.error('Error sending reject order in-app notification:', error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // };
