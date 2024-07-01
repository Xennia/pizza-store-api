const uuid = require('uuid');
const orders = [];

exports.getOrders = (req, res) => {
  res.json(orders);
};

exports.getOrder = (req, res) => {
  const order = orders.find(o => o.id === req.params.orderId);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
};

exports.createOrder = (req, res) => {
  const { size, toppings, quantity } = req.body;
  const newOrder = { id: uuid.v4(), size, toppings, quantity, status: 'pending' };
  orders.push(newOrder);
  res.status(201).json(newOrder);
};

exports.updateOrder = (req, res) => {
  const order = orders.find(o => o.id === req.params.orderId);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  const { size, toppings, quantity } = req.body;
  order.size = size || order.size;
  order.toppings = toppings || order.toppings;
  order.quantity = quantity || order.quantity;
  res.json(order);
};

exports.deleteOrder = (req, res) => {
  const orderIndex = orders.findIndex(o => o.id === req.params.orderId);
  if (orderIndex === -1) return res.status(404).json({ error: 'Order not found' });
  
  orders.splice(orderIndex, 1);
  res.status(204).end();
};

exports.completeOrder = (req, res) => {
  const order = orders.find(o => o.id === req.params.orderId);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  order.status = 'completed';
  res.json(order);
};
