const express = require('express');
const { getOrders, getOrderById, createOrder, updateOrder, completeOrder } = require('../controllers/ordersController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.get('/', getOrders);
router.get('/:orderId', getOrderById);
router.post('/', createOrder);
router.put('/:orderId', updateOrder);
router.post('/:orderId/complete', authenticateToken, completeOrder);

module.exports = router;
