import database from '../dummyData';

<<<<<<< HEAD
const { orders } = database;
=======
const { orderModel, menuModel } = database;
>>>>>>> 794cd9a51e48aab34837e556353a67948ba1103e

class orderController {
  static orderMeal(req, res) {
    const {
<<<<<<< HEAD
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
=======
      menuId,
      meals
    } = req.body;

    const id = order.length + 1;

    const foundOrder = order.find(ordered => (ordered.mealId.))
>>>>>>> 794cd9a51e48aab34837e556353a67948ba1103e
  }
}

export default orderController;
