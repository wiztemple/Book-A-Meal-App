import moment from 'moment';
import db from '../models/index';

/**
 * Menu Controller.
 * @class MenuController
 * */
export default class MenuController {
  /**
   * create a menu
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static addMenu(request, response) {
    const {
      description,
      meals,
      date,
    } = request.body;
    const Today = moment();
    db.Menu.create({
      userId: request.userId,
      description,
      date: date || Today,
    }, { include: [db.User] }, { include: [db.Meal] }).then((createdMenu) => {
      if (createdMenu) {
        createdMenu.setMeals(meals);
        return response.status(201).json({
          status: 'success',
          message: 'menu was successfully created',
          menu: {
            id: createdMenu.id,
            description: createdMenu.description,
            date: createdMenu.date,
            createdAt: createdMenu.createdAt,
            updatedAt: createdMenu.updatedAt
          },
        });
      }
    }).catch(error => response.status(500).json({
      status: 'error',
      message: error.message,
    }));
  }

  /**
   * get menu
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static getMenu(request, response) {
    return db.Menu.findAll({
      include: [
        db.Meal
      ]
    }).then((menu) => {
      response.status(200).json({
        status: 'success',
        menu,
      });
    }).catch((error) => {
      response.status(500).json({
        message: error.message,
      });
    });
  }
}
