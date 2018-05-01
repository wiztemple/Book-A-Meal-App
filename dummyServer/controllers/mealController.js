import database from '../dummyData';

const { meals } = database;

class MealController {
  static addMeal(request, response) {
    const {
      mealTitle,
      description,
      price,
      imageUrl,
    } = request.body;
    if (!mealTitle.trim() || !description.trim() || price <= 0 || !imageUrl.trim()) {
      return response.status(400).json({
        message: 'Bad Request',
      });
    }
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
    if (foundMeal) {
      if (foundMeal.id === id) {
        return response.status(409).json({
          message: `A meal with this '${id}' is already in the meal options`,
          status: 'Fail',
        });
      }
    }
    if (!foundMeal) {
      meals.push(addedMeal);
      return response.status(201).json({
        meal: addedMeal,
        status: 'Success',
        message: 'Meal added successfully',
      });
    }
    return response.status(409).json({
      message: `A meal with this '${id}' is already in the meal options`,
      status: 'Fail',
    });
  }

  static getAllMeals(request, response) {
    return response.status(200).json({
      Allmeals: meals,
      status: 'Success',
      message: 'All meals',
    });
  }

  static updateMeal(request, response) {
    const {
      mealTitle,
      description,
      price,
      imageUrl,
    } = request.body;
    if (!mealTitle.trim() || !description.trim() || price <= 0 || !imageUrl.trim()) {
      return response.status(400).json({
        message: 'Bad Request',
      });
    }
    const foundMeal = meals.findIndex(meal =>
      meal.id === parseInt(request.params.mealId, 10));
    if (foundMeal >= 0) {
      meals[foundMeal].mealTitle = request.body.mealTitle;
      meals[foundMeal].description = request.body.description;
      meals[foundMeal].price = request.body.price;
      meals[foundMeal].imageUrl = request.body.imageUrl;
      return response.status(200).json({
        status: 'Success',
        message: 'Meal updated successfully',
      });
    }
    return response.status(404).json({
      status: 'Error',
      message: 'Meal not found',
    });
  }

  static removeMeal(request, response) {
    const foundMeal = meals.find(meal => meal.id === parseInt(request.params.mealId, 10));
    if (foundMeal) {
      meals.splice(foundMeal.id - 1, 1);
      return response.status(200).json({
        meals,
        status: 'Success',
        message: 'Meal was successfully remove from meals option',
      });
    }
    return response.status(404).json({
      status: 'error',
      message: 'Meal is not found in the meal option',
    });
  }
}

export default MealController;
