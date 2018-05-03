import database from '../dummyData';

const { orders } = database;

class OrderController {
  static orderMeal(request, response) {
    const {
      mealId,
      timeOrdered,
      orderedBy,
      receivedBy,
      quantity,
      totalPrice,
    } = request.body;

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
    const foundOrder = orders.findIndex(order => order.id === parseInt(request.params.orderId, 10));
    if (foundOrder < 0) {
      orders.push(addedOrder);
      return response.status(201).json({
        order: orders,
        status: 'Success',
        message: 'Order was successfully made',
      });
    }
    return response.status(409).json({
      message: `A meal with this '${id}' is already in the meal options`,
      status: 'Fail',
    });
  }

  static getAllOrders(req, res) {
    return res.status(200).json({
      AllOrders: orders,
      status: 'Success',
      message: 'All orders',
    });
  }

  static updateOrder(request, response) {
    const orderIndex = orders.findIndex(order => order.id === parseInt(request.params.orderId, 10));
    if (orderIndex >= 0) {
      if (orders[orderIndex].mealId === request.body.mealId) {
        orders[orderIndex].quantity = request.body.quantity;
        return response.status(200).json({
          status: 'Success',
          message: 'Order updated successfully',
        });
      }
    }
    return response.status(404).json({
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
