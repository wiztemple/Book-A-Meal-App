import database from '../dummyData';

const { orders } = database;

class orderController {
  static orderMeal(req, res) {
    const {
     mealId,
     timeOrdered,
     orderedBy,
     receivedBy,
     quantity,
     totalPrice
    } = req.body;

    const id = meals[meals.length - 1].id + 1;
    const addedOrder = {
      id,
      mealId,
      timeOrdered,
      orderedBy,
      receivedBy,
      quantity,
      totalPrice,
    };
    const foundOrder = orders.find(order => (order.mealId === mealId));
    if (!foundOrder) {
      orders.push(addedOrder);
      res.status(201).json({
        order: orders,
        status: 'Success',
        message: 'Your Order was successfully made'
      })
    }
    return res.status(409).json({
      message: `A meal with this '${id}' is already in the meal options`,
      status: 'Fail',
    });
  }
}

export default orderController;
