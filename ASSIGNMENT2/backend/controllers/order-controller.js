const HttpError = require('../utils/http-error');
const Order = require('../models/order');

const orderController = {

  async getAllOrders(request, response, next) {
    let orders;

    try{
      orders = await Order.find({});
    } catch (err) {
        const error = new HttpError(
          'Fetching orders failed, please try again later.',
          500
        );
      return next(error);
    }

    if (!orders || orders.length === 0) {
      const error =  new HttpError('We couldn\'t find any orders', 404);
      return next(error);
    }


    response.status(200).json({orders: orders.map(order => order.toObject({getters: true}))});
},
    async createOrder (request, response, next) {

      const createdOrder = new Order(request.body);

      try {
        await createdOrder.save();
      } catch (err) {
        const error = new HttpError(
          'Creating order failed, please try again.',
          500
        );
        return next(error);
      }

      response.status(201).json({ order: createdOrder });
  },
      
      

};

module.exports = orderController;