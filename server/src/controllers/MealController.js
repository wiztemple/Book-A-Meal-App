import db from '../models/index';

export default class MealController {
  static addMeals(request, response) {
    const {
      title, description, price, imageUrl,
    } = request.body;

    db.Meal.findOne({
      where: {
        title,
      },
    })
      .then((mealExists) => {
        if (mealExists) {
          return response.status(409).json({
            status: 'Fail',
            message: 'meal title already exist',
          });
        }
      })
      .then(() => db.Meal.create({
        title, description, price, imageUrl,
      }))
      .then((newMeal) => {
        response.status(201).json({
          status: 'success',
          message: 'meal successfully added',
          newMeal,
        });
      })
      .catch((error) => {
        response.status(500).json({
          status: 'error',
          message: error.message,
        });
      });
  }

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
          mealExists.update(update).then(updatedMeal => response.status(200).json({
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
          cascade: true,
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
