const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  completeOrder
} = require('../controllers/ordersController');

router.get('/', getOrders);
router.get('/:orderId', getOrder);
router.post('/', createOrder);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);
router.post('/:orderId/complete', completeOrder);

module.exports = router;
