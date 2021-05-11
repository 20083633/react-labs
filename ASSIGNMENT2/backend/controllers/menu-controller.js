const HttpError = require('../utils/http-error');
const Filling = require('../models/filling');


const menuController = {

  async getMenu(request, response, next) {

    let fillings;
    try {
      fillings = await Filling.find({});
    } catch (err) {
      const error = new HttpError(
        'Fetching menu toppings failed, please try again later.',
        500
      );
      return next(error);
    }
    response.json({fillings});

  }

};

module.exports = menuController;
