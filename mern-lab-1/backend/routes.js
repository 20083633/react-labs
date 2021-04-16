const express = require('express');
const menuController = require('./controllers/menu-controller');
const orderController = require('./controllers/order-controller');
const router = express.Router();


// routes to be added here
router.get('/', menuController.getMenu);
router.post('/checkout', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);

module.exports = router;
