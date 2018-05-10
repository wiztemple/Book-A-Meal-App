import db from '../models/index';

/**
 * Meal Controller.
 * @class MealController
 * */
export default class MealController {
  /**
   * Add a meal
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static addMeals(request, response) {
    const {
      title, description, price, imageUrl,
    } = request.body;

    db.Meal.findOne({
      where: {
        title,
        userId: request.userId
      },
    })
      .then((mealExists) => {
        if (mealExists) {
          return response.status(409).json({
            status: 'Fail',
            message: 'meal already exist',
          });
        }
        db.Meal.create({
          title,
          description,
          price,
          imageUrl,
          userId: request.userId
        }).then((newMeal) => {
          response.status(201).json({
            status: 'success',
            message: 'meal successfully added',
            newMeal,
          });
        }).catch((error) => {
          response.status(500).json({
            status: 'error',
            message: error.message
          });
        });
      }).catch((error) => {
        response.status(500).json({
          status: 'error',
          message: error.message,
        });
      });
  }

  /**
   * Get all meals
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static getAllMeals(request, response) {
    return db.Meal.findAll().then((meals) => {
      response.status(200).json({
        status: 'success',
        meals,
      });
    }).catch(error => response.status(500).json({
      status: 'error',
      message: error.message,
    }));
  }

  /**
   * Update a meal
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static updateMeal(request, response) {
    const {
      title, description, price, imageUrl,
    } = request.body;

    db.Meal.findOne({
      where: {
        id: request.params.mealId,
      },
    })
      .then((mealExists) => {
        if (mealExists) {
          const update = {
            title: title || mealExists.title,
            description: description || mealExists.description,
            price: price || mealExists.price,
            imageUrl: imageUrl || mealExists.imageUrl,
          };
          mealExists.update(update)
            .then(updatedMeal => response.status(200).json({
              status: 'success',
              message: 'Updated successfully',
              meal: updatedMeal,
            }));
        }
        if (!mealExists) {
          return response.status(404).json({
            status: 'fail',
            message: `Cannot find meal with id ${request.params.mealId}`,
          });
        }
      })
      .catch(error => response.status(500).json({
        status: 'error',
        message: error.message,
      }));
  }

  /**
   * delete a meal
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static deleteMeal(request, response) {
    db.Meal.findOne({
      where: {
        id: request.params.mealId,
      },
    }).then((mealExists) => {
      if (mealExists) {
        return db.Meal.destroy({
          where: {
            id: request.params.mealId,
          },
        });
      }
    }).then(() => response.status(200).json({
      status: 'success',
      message: 'meal deleted',
    })).catch((error) => {
      response.status(500).json({
        status: 'error',
        message: error.message,
      });
    });
  }
}
