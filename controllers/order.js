const express = require("express");
const Order = require("../models/order");
const Notification = require('../models/notification');

const createOrder = async (req, res) => {
    try {
      const user = req.user;
      const userId = req.id
      const newOrder = new Order({ ...req.body, user });
      const savedOrder = await newOrder.save();
      const userNotification = await Notification.create({ 
        user: userId,
        userModel: 'User',
        orderId: newOrder._id,
        message: 'You have created a new order',
      });
      const techNotification = await Notification.create({ 
        user: req?.body?.recepient?._id,
        userModel: 'Technician',
        orderId: newOrder._id,
        message: 'A new order can been created in your favor. Please accept or reject the order',
      });
      res.status(201).json(savedOrder);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  };

  const rateOrder = async (req, res) => {
    try {
      const { orderId, rating } = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { rating }, { returnDocument: 'after' });
      const userNotification = await Notification.create({ 
        user: req.user?._id,
        userModel: 'User',
        orderId,
        message: 'You have rated the order',
      });
      const techNotification = await Notification.create({ 
        user: updatedOrder?.recepient?._id,
        userModel: 'Technician',
        orderId,
        message: `You have received a ${rating} rating on an order`,
      });
      res.status(201).json(updatedOrder?._doc);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  };

// Get all orders
const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find({ $or: [{ 'user._id': req.user?._id }, { 'recepient._id': req.id }] }).sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateOrderById = async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.orderId,
        req.body,
        { new: true }
      );
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteOrderById = async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateOrderStatus = async (req, res) => {
    try {
      const { orderId, status, rejectionReason } = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { status });
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      const userNotification = await Notification.create({ 
        user: updatedOrder.user._id,
        userModel: 'User',
        orderId: orderId,
        messageType: status,
        message: status === 'Accepted' ? 
        'Your order status has been accepted. You can now take it to the technician for the service' : 
        `Your order has been rejected due to the reason that follows: ${rejectionReason}`,
      });
      const techNotification = await Notification.create({ 
        user: updatedOrder?.recepient?._id,
        orderId: orderId,
        userModel: 'Technician',
        messageType: status,
        message: status === 'Accepted' ? 
        'You have accepted the order' : 
        `Your have rejected the order due to the reason that follows: ${rejectionReason}`,
      });
      res.status(200).json({ message: "Order Status Updated" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find({ user: req.id })
      .sort({ createdAt: -1 })
      .populate('user', '-password')
      .populate('orderId')
      res.status(200).json({ message: "Notifications", notifications });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// module.exports = router;

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById,
    updateOrderStatus,
    getNotifications,
    rateOrder,
  };
