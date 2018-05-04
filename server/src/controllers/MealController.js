import db from '../models/index';

export default class MealController {
  static addMeals(request, response) {
    const {
      title, description, price, imageUrl,
    } = request.body;

    db.Meals.findOne({
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
        if (!mealExists) {
          db.Meals.create({
            title, description, price, imageUrl,
          })
            .then((newMeal) => {
              response.status(201).json({
                status: 'success',
                message: 'meal successfully added',
                newMeal,
              });
            });
        }
      }).catch((err) => {
        console.log(err);
        response.status(500).json({
          status: 'error',
          message: 'Internal error',
        });
      });
  }

  static getAllMeals(request, response) {
    return db.Meals.findAll().then((meals) => {
      response.status(200).json({
        status: 'success',
        meals,
      });
    }).catch(() => response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    }));
  }


  static updateMeal(request, response) {
    const {
      title, description, price, imageUrl,
    } = request.body;

    db.Meals.findOne({
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
      .catch(() => response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      }));
  }

  static deleteMeal(request, response) {
    db.Meals.findOne({
      where: {
        id: request.params.mealId,
      },
    }).then((mealExists) => {
      if (!mealExists) {
        response.status(404).json({
          status: 'fail',
          message: `can't find a meal with that Id ${request.params.mealId}`,
        });
      }
      if (mealExists) {
        db.Meals.destroy({
          where: {
            id: request.params.mealId,
          },
          cascade: true,
        }).then(() => {
          response.status(200).json({
            status: 'success',
            message: 'meal deleted',
          });
        });
      }
    }).catch(() => {
      response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    });
  }
}
