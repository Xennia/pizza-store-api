const { orders } = require('../models/order');
const { body, validationResult } = require('express-validator');

const getOrders = (req, res) => {
  res.json(orders);
};

const getOrderById = (req, res) => {
  const { orderId } = req.params;
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
};

const createOrder = [
  body('size').isIn(['small', 'medium', 'large']).withMessage('Invalid size'),
  body('toppings').isArray().withMessage('Toppings should be an array'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity should be a positive integer'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { size, toppings, quantity } = req.body;
    const newOrder = {
      id: uuidv4(),
      size,
      toppings,
      quantity,
      status: 'pending'
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
  }
];

const updateOrder = [
  body('size').isIn(['small', 'medium', 'large']).withMessage('Invalid size'),
  body('toppings').isArray().withMessage('Toppings should be an array'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity should be a positive integer'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { orderId } = req.params;
    const { size, toppings, quantity } = req.body;

    const order = orders.find(o => o.id === orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.size = size;
    order.toppings = toppings;
    order.quantity = quantity;

    res.json(order);
  }
];

const completeOrder = (req, res) => {
  const { orderId } = req.params;

  const orderIndex = orders.findIndex(o => o.id === orderId);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const order = orders[orderIndex];

  // Calculate total price (this is a simple example, you can adjust as needed)
  const basePrice = pricePerSize[order.size] || 0;
  const toppingPrice = order.toppings.length * 2;
  const totalPrice = basePrice + toppingPrice * order.quantity;

  // Simulate order completion by removing from the in-memory store
  orders.splice(orderIndex, 1);

  // Return order summary
  res.json({
    id: order.id,
    size: order.size,
    toppings: order.toppings,
    quantity: order.quantity,
    totalPrice: totalPrice,
    status: 'completed'
  });
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  completeOrder
};

