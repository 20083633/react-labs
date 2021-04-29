const express = require('express');
const menuController = require('./controllers/menu-controller');
const orderController = require('./controllers/order-controller');
const userController = require('./controllers/user-controller');
const checkAuth = require('./middleware/check-auth');
const router = express.Router();

router.get('/', menuController.getMenu);
router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.use(checkAuth);

router.post('/checkout', orderController.createOrder);
router.get('/users/:uid', userController.getUserById);
router.get('/orders/:uid', orderController.getOrdersByUserId);
router.put('/updateuser/:uid', userController.updateUser);
router.delete('/deleteuser/:uid', userController.deleteUser);

module.exports = router;
