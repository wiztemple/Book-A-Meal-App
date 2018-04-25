import database from '../dummyData';

const { meals } = database;

class MealController {
  static addMeal(req, res) {
    const {
      mealTitle,
      description,
      price,
      imageUrl,
    } = req.body;
    const id = meals[meals.length - 1].id + 1;
    const addedMeal = {
      id,
      mealTitle,
      description,
      price,
      imageUrl,
    };
    const foundMeal = meals.find(meal =>
      (meal.mealTitle.toLowerCase() === mealTitle.toLowerCase()));
    if (!foundMeal) {
      meals.push(addedMeal);
      return res.status(201).json({
        meal: addedMeal,
        status: 'Success',
        message: 'Meal added successfully',
      });
    }
    if (foundMeal) {
      if (foundMeal.id === id) {
        return res.status(409).json({
          message: `A meal with this '${id}' is already in the meal options`,
          status: 'Fail',
        });
      }
    }
    return res.status(409).json({
      message: `A meal with this '${id}' is already in the meal options`,
      status: 'Fail',
    });
  }

  static getAllMeals(req, res) {
    return res.status(200).json({
      Allmeals: meals,
      status: 'Success',
      message: 'All meals',
    });
  }

  static updateMeal(req, res) {
    const foundMeal = meals.find(meal =>
      meal.id === parseInt(req.params.mealId, 10));
    if (foundMeal) {
      foundMeal.mealTitle = req.body.mealTitle;
      foundMeal.description = req.body.description;
      foundMeal.price = req.body.price;
      foundMeal.imageUrl = req.body.imageUrl;
      return res.status(200).json({
        foundMeal,
        status: 'Success',
        message: 'Meal updated successfully',
      });
    }
    return res.status(404).json({
      status: 'Error',
      message: 'Meal not found',
    });
  }

  static removeMeal(req, res) {
    const foundMeal = meals.find(meal => meal.id === parseInt(req.params.mealId, 10));
    if (foundMeal) {
      meals.splice(foundMeal.id - 1, 1);
      return res.status(200).json({
        meals,
        status: 'Success',
        message: 'Meal was successfully remove from meals option',
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Meal is not found in the meal option',
    });
  }
}

export default MealController;
