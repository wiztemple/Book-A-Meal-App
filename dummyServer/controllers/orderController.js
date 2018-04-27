import database from '../dummyData';

const { orders } = database;

class OrderController {
  static orderMeal(req, res) {
    const {
      mealId,
      timeOrdered,
      orderedBy,
      receivedBy,
      quantity,
      totalPrice,
    } = req.body;

    const id = orders[orders.length - 1].id + 1;
    const addedOrder = {
      id,
      mealId,
      timeOrdered,
      orderedBy,
      receivedBy,
      quantity,
      totalPrice,
    };
    const foundOrder = orders.findIndex(order => order.id === parseInt(req.params.orderId, 10));
    if (foundOrder < 0) {
      orders.push(addedOrder);
      return res.status(201).json({
        order: orders,
        status: 'Success',
        message: 'Order was successfully made',
      });
    }
    return res.status(409).json({
      message: `A meal with this '${id}' is already in the meal options`,
      status: 'Fail',
    });
  }

  static getAllOrders(req, res) {
    console.log('Testing');
    return res.status(200).json({
      AllOrders: orders,
      status: 'Success',
      message: 'All orders',
    });
  }

  static updateOrder(req, res) {
    const orderIndex = orders.findIndex(order => order.id === parseInt(req.params.orderId, 10));
    if (orderIndex >= 0) {
      if (orders[orderIndex].mealId === req.body.mealId) {
        orders[orderIndex].quantity = req.body.quantity;
        return res.status(200).json({
          status: 'Success',
          message: 'Order updated successfully',
        });
      }
    }
    return res.status(404).json({
      status: 'Error',
      message: 'Order not found',
    });
  }

  static removeOrder(req, res) {
    const foundOrder = orders.find(order => order.id === parseInt(req.params.orderId, 10));
    if (foundOrder) {
      orders.splice(foundOrder.id - 1, 1);
      return res.status(200).json({
        orders,
        status: 'Success',
        message: 'Order was successfuly removed',
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Order not found',
    });
  }
}
export default OrderController;
