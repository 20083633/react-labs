const express = require('express');

const router = express.Router();
const menuController = require('./controllers/menu-controller');
const orderController = require('./controllers/order-controller');

// routes to be added here
router.get('/', menuController.getMenu);
router.get('/orders', orderController.getAllOrders);
router.post('/checkout', orderController.createOrder);

module.exports = router;
