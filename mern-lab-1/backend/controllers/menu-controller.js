const HttpError = require('../utils/http-error');
const Topping = require('../models/topping');
const { response } = require('express');

const menuController = {

  async getMenu(request, response, next) {
    let toppings;
    try {
      toppings = await Topping.find({});
    } 
    catch (err) {
      const error = new HttpError(
        'Fetching menu toppings failed, please try again later.',
        500
      );
      return next(error);
    }
    response.json({toppings});
  }

};

module.exports = menuController;