import database from '../dummyData';

const { orderModel, menuModel } = database;

class orderController {
  static orderMeal(req, res) {
    const {
      menuId,
      meals
    } = req.body;

    const id = order.length + 1;

    const foundOrder = order.find(ordered => (ordered.mealId.))
  }
}

export default orderController;
