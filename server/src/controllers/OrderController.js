import db from '../models/index';

/**
 * Order Controller.
 * @class OrderController
 * */
export default class OrderController {
  /**
   * create an order
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static makeOrder(request, response) {
    const {
      quantity, mealId, deliveryAddress
    } = request.body;
    db.Order.findOne({
      where: {
        id: request.orderId,
      }
    }).then((orderExist) => {
      if (orderExist) {
        return response.status(409).json({
          status: 'Fail',
          message: 'The order already exists'
        });
      }
      db.Order.create({
        userId: request.userId,
        mealId,
        quantity,
        deliveryAddress
      }, { include: [db.User] }, { include: [db.Meal] }).then((newOrder) => {
        response.status(201).json({
          status: 'success',
          message: 'Order was successfully placed',
          newOrder: {
            id: newOrder.id,
            quantity: newOrder.quantity,
            deliveryAddress: newOrder.deliveryAddress,
            createdAt: newOrder.createdAt,
            updatedAt: newOrder.updatedAt
          },
        });
      });
    }).catch((error) => {
      response.status(409).json({
        status: 'error',
        message: error.message,
      });
    });
  }
  /**
   * Get all orders
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static getOrders(request, response) {
    return db.Order.findAll({
      include: [
        db.Meal
      ]
    }).then((order) => {
      response.status(200).json({
        status: 'success',
        order,
      });
    }).catch(error => response.status(500).json({
      status: 'error',
      message: error.message,
    }));
  }

  /**
   * Update an order
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static updateOrder(request, response) {
    const {
      mealId, quantity, deliveryAddress
    } = request.body;

    db.Order.findOne({
      where: {
        id: request.params.orderId,
      },
    })
      .then((foundOrder) => {
        if (foundOrder) {
          const update = {
            mealId: mealId || foundOrder.mealId,
            quantity: quantity || foundOrder.quantity,
            deliveryAddress: deliveryAddress || foundOrder.deliveryAddress,
          };
          foundOrder.update(update)
            .then(updatedOrder => response.status(200).json({
              status: 'success',
              message: 'Updated successfully',
              foundOrder: updatedOrder,
            }));
        }
        if (!foundOrder) {
          return response.status(404).json({
            status: 'fail',
            message: `Cannot find order with id ${request.params.orderId}`,
          });
        }
      })
      .catch(error => response.status(500).json({
        status: 'error',
        message: error.message,
      }));
  }

  /**
   * Remove an order
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static removeOrder(request, response) {
    db.Order.findOne({
      where: {
        id: request.params.orderId,
      },
    }).then((foundOrder) => {
      if (foundOrder) {
        return db.Order.destroy({
          where: {
            id: request.params.orderId,
          },
          cascade: true,
        });
      }
    }).then(() => response.status(200).json({
      status: 'success',
      message: 'order deleted',
    })).catch((error) => {
      response.status(500).json({
        status: 'error',
        message: error.message,
      });
    });
  }
}
